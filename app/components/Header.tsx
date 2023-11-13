'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, ReactNode, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  children: ReactNode;
  className?: string;
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  const handleLogout = () => {
    // handle logout
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div></div>
      {children}
    </div>
  );
};

export default Header;
