// Site configuration for VindLoodgieter.nl (Netherlands)
export const getSiteConfig = () => {
  const domain = process.env.NEXT_PUBLIC_SITE_DOMAIN ||
                 (typeof window !== 'undefined' ? window.location.hostname : 'vindloodgieter.nl');

  const configs: Record<string, {
    id: string;
    domain: string;
    name: string;
    description: string;
  }> = {
    'vindloodgieter.nl': {
      id: 'loodgieter',
      domain: 'vindloodgieter.nl',
      name: 'VindLoodgieter.nl',
      description: 'Vind een loodgieter bij jou in de buurt'
    },
    'www.vindloodgieter.nl': {
      id: 'loodgieter',
      domain: 'vindloodgieter.nl',
      name: 'VindLoodgieter.nl',
      description: 'Vind een loodgieter bij jou in de buurt'
    },
    'localhost:3000': {
      id: 'loodgieter',
      domain: 'vindloodgieter.nl',
      name: 'VindLoodgieter.nl',
      description: 'Vind een loodgieter bij jou in de buurt'
    },
    'localhost:3001': {
      id: 'loodgieter',
      domain: 'vindloodgieter.nl',
      name: 'VindLoodgieter.nl',
      description: 'Vind een loodgieter bij jou in de buurt'
    }
  };

  return configs[domain] || configs['vindloodgieter.nl'];
};
