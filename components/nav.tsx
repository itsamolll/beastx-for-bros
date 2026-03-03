import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/onboarding', label: 'Onboarding' },
  { href: '/split', label: 'Split' },
  { href: '/history', label: 'History' },
  { href: '/progress', label: 'Progress' }
];

export function Nav() {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="rounded px-3 py-2 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800">
          {link.label}
        </Link>
      ))}
      <div className="ml-auto"><ThemeToggle /></div>
    </nav>
  );
}
