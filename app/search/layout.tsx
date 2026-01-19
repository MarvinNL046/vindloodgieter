import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loodgieters Zoeken | VindLoodgieter.nl',
  description: 'Zoek in onze database van loodgieters door heel Nederland. Vind loodgieters op naam, plaats, provincie of postcode.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
