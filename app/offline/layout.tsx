import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline | VindLoodgieter.nl',
  description: 'U bent momenteel offline. Controleer uw internetverbinding.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
