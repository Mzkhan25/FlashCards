import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './Header';

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface bg-dotgrid">
      <Header />
      <main className="max-w-5xl mx-auto pb-24 md:pb-0 px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
