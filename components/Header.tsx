import { useState, useEffect } from 'react';

const Header = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const hour = new Date().getHours();
    setMessage(
      'Good ' +
        ((hour < 12 && 'morning') || (hour < 18 && 'afternoon') || 'evening')
    );
  }, []);

  return <h1 className='text-4xl font-bold'>{message}</h1>;
};

export default Header;
