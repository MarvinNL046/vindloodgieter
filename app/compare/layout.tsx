import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loodgieters Vergelijken | VindLoodgieter.nl',
  description: 'Vergelijk loodgieters naast elkaar. Bekijk details, foto\'s, beoordelingen en diensten om de juiste loodgieter te vinden.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
