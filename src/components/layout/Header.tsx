import { NavLink } from 'react-router';
import { motion } from 'motion/react';

const links = [
  {
    to: '/',
    label: 'Practice',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="16" height="16" rx="2" />
        <rect x="6" y="2" width="16" height="16" rx="2" />
      </svg>
    ),
  },
  {
    to: '/conjugate',
    label: 'Conjugate',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    to: '/type-quiz',
    label: 'Type Quiz',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="6" y1="16" x2="14" y2="16" />
        <line x1="6" y1="8" x2="10" y2="8" />
      </svg>
    ),
  },
  {
    to: '/cards',
    label: 'All Cards',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
];

function DesktopNav() {
  return (
    <header className="hidden md:block bg-surface-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl text-text-primary">
          <span className="text-primary">DE</span> FlashCards
        </h1>
        <div className="flex items-center gap-3">
        <nav className="flex gap-1 bg-surface-elevated rounded-xl p-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-pill"
                      className="absolute inset-0 bg-surface-card rounded-lg shadow-sm"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'}`}>
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/settings" className={({ isActive }) => `p-2 rounded-lg transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-text-primary'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </NavLink>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-card/90 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-primary' : 'text-text-muted'}>
                  {link.icon}
                </span>
                <span className={`text-[11px] font-medium ${isActive ? 'text-primary' : 'text-text-muted'}`}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-dot"
                    className="absolute top-1.5 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function Header() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}
