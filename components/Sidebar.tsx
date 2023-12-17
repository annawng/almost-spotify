'use client';

import { useRef, useState, MouseEvent } from 'react';
import { HiOutlineMenu as Menu } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import Nav from './Nav';

const Sidebar = ({ className }: { className?: string }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={className}>
      {/* Desktop menu */}
      <div className='hidden md:flex flex-col gap-10 px-6 pt-6 bg-neutral-900 h-full w-[300px]'>
        <Nav />
      </div>

      {/* Mobile menu */}
      <div className='md:hidden absolute left-0 z-10 p-6 w-full bg-neutral-950'>
        <Menu
          size={28}
          className='cursor-pointer'
          aria-label='Open menu'
          onClick={toggleMenu}
        />
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className='md:hidden absolute w-full h-full bg-black/60 overscroll-none z-10'
            onClick={(e: MouseEvent) => {
              if (
                menuRef.current &&
                !(menuRef.current as any).contains(e.target)
              ) {
                toggleMenu();
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.5, type: 'tween', ease: 'easeInOut' }}
          >
            <motion.div
              className='md:hidden fixed bg-neutral-900 w-[80vw] max-w-xs h-full inset-0 z-20 flex flex-col'
              ref={menuRef}
              initial={{ x: '-100vw' }}
              animate={{ x: '0' }}
              exit={{
                x: '-100vw',
              }}
              transition={{ duration: 0.5, type: 'tween', ease: 'easeInOut' }}
            >
              <div className='flex flex-col overflow-y-auto gap-10 w-full px-6 pt-6 relative'>
                <Nav onClick={toggleMenu} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
