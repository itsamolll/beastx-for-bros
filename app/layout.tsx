import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';
import { Nav } from '@/components/nav';

export const metadata: Metadata = {
  title: 'Beast X - Gym Tracker',
  description: 'Production-ready MVP gym tracker app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <main className="mx-auto min-h-screen max-w-5xl p-4 md:p-6">
            <h1 className="mb-4 text-2xl font-bold">Beast X</h1>
            <Nav />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
