import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | VindLoodgieter.nl Gids',
    default: 'Loodgieter Gidsen & Tips | VindLoodgieter.nl',
  },
  description: 'Praktische gidsen over loodgietersdiensten, tips voor onderhoud, kosten en het kiezen van de juiste loodgieter in Nederland.',
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-secondary/20 min-h-screen">
      {children}
    </div>
  );
}
