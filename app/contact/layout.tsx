import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | VindLoodgieter.nl',
  description: 'Neem contact op met VindLoodgieter.nl voor vragen, suggesties of samenwerkingen.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
