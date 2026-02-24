import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NeoBank',
  description: 'Modern Banking App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
