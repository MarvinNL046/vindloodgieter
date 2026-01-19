import * as fs from 'fs/promises';
import * as path from 'path';
import chalk from 'chalk';

interface Loodgieter {
  name: string;
  city: string;
  province: string;
  province_abbr: string;
  municipality: string;
  slug: string;
  service_types: string[];
  specializations: string[];
  website?: string;
  phone?: string;
  address?: string;
}

async function analyzeDataQuality() {
  console.log(chalk.bold.blue('\n🔍 Loodgieter Data Quality Analysis\n'));

  // Load data
  const dataFile = path.join(__dirname, '..', 'public', 'data', 'loodgieters.json');
  let loodgieters: Loodgieter[];

  try {
    loodgieters = JSON.parse(await fs.readFile(dataFile, 'utf-8'));
  } catch (error) {
    console.error(chalk.red('❌ Could not load loodgieters.json'));
    process.exit(1);
  }

  console.log(chalk.cyan(`Total entries: ${loodgieters.length}`));

  // Analyze generic names
  const genericNames = ['loodgieter', 'installateur', 'sanitair', 'loodgieters'];
  const genericEntries = loodgieters.filter(f =>
    genericNames.some(g => f.name.toLowerCase().trim() === g)
  );

  console.log(chalk.yellow(`\n📊 Generic name entries: ${genericEntries.length}`));
  if (genericEntries.length > 0) {
    console.log(chalk.gray('\nGeneric entries by city:'));
    genericEntries.forEach(entry => {
      console.log(chalk.gray(`  - "${entry.name}" in ${entry.city}, ${entry.province}`));
    });
  }

  // Analyze suspicious patterns
  console.log(chalk.yellow('\n🚨 Suspicious patterns:'));

  // Entries without proper names
  const shortNames = loodgieters.filter(f => f.name.length < 5);
  console.log(chalk.gray(`\nVery short names (< 5 chars): ${shortNames.length}`));
  shortNames.slice(0, 10).forEach(entry => {
    console.log(chalk.gray(`  - "${entry.name}" in ${entry.city}, ${entry.province}`));
  });

  // Entries missing key data
  const missingPhone = loodgieters.filter(f => !f.phone);
  const missingAddress = loodgieters.filter(f => !f.address);
  const missingWebsite = loodgieters.filter(f => !f.website);

  console.log(chalk.gray(`\nMissing phone: ${missingPhone.length}`));
  console.log(chalk.gray(`Missing address: ${missingAddress.length}`));
  console.log(chalk.gray(`Missing website: ${missingWebsite.length}`));

  // Analyze duplicates
  const nameCityPairs = loodgieters.map(f => `${f.name}|${f.city}|${f.province}`);
  const duplicates = nameCityPairs.filter((item, index) => nameCityPairs.indexOf(item) !== index);
  console.log(chalk.gray(`\nDuplicate entries: ${duplicates.length}`));

  // Province analysis
  console.log(chalk.cyan('\n📍 Province distribution:'));
  const provinceCounts: Record<string, number> = {};
  loodgieters.forEach(f => {
    provinceCounts[f.province] = (provinceCounts[f.province] || 0) + 1;
  });

  Object.entries(provinceCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([province, count]) => {
      console.log(chalk.gray(`  - ${province}: ${count} entries`));
    });

  // Service type analysis
  console.log(chalk.cyan('\n🔧 Service types:'));
  const serviceCounts: Record<string, number> = {};
  loodgieters.forEach(f => {
    (f.service_types || []).forEach(type => {
      serviceCounts[type] = (serviceCounts[type] || 0) + 1;
    });
  });

  Object.entries(serviceCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .forEach(([type, count]) => {
      console.log(chalk.gray(`  - ${type}: ${count} entries`));
    });

  // Specialization analysis
  console.log(chalk.cyan('\n⭐ Specializations:'));
  const specCounts: Record<string, number> = {};
  loodgieters.forEach(f => {
    (f.specializations || []).forEach(spec => {
      specCounts[spec] = (specCounts[spec] || 0) + 1;
    });
  });

  Object.entries(specCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .forEach(([spec, count]) => {
      console.log(chalk.gray(`  - ${spec}: ${count} entries`));
    });

  // Recommendations
  console.log(chalk.bold.green('\n✅ Recommendations:'));
  console.log('1. Filter out entries with generic names');
  console.log('2. Verify province assignments for edge cases');
  console.log('3. Remove or merge duplicate entries');
  console.log(`4. Consider removing ${genericEntries.length} generic entries before enrichment`);
  console.log(`5. Enrich ${missingPhone.length} entries missing phone numbers`);
  console.log(`6. Enrich ${missingWebsite.length} entries missing websites`);

  // Export problematic entries
  const problematicEntries = {
    genericNames: genericEntries,
    shortNames: shortNames.slice(0, 20),
    missingData: {
      phone: missingPhone.length,
      address: missingAddress.length,
      website: missingWebsite.length,
    },
    totalEntries: loodgieters.length,
    cleanEntries: loodgieters.length - genericEntries.length
  };

  const outputFile = path.join(__dirname, '..', 'data', 'data-quality-report.json');
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(problematicEntries, null, 2));

  console.log(chalk.magenta(`\n📄 Full report saved to: ${outputFile}`));
}

analyzeDataQuality().catch(console.error);
