import React from 'react';

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className='max-w-full flex gap-8 overflow-x-scroll'>{children}</ul>
  );
};

export default Row;
