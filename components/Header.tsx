import { useState, useEffect } from 'react';
import H1 from './H1';

const Header = () => {
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const hour = new Date().getHours();
    setMessage(
      'Good ' +
        ((hour < 12 && 'morning') || (hour < 18 && 'afternoon') || 'evening')
    );
  }, []);

  return <H1 className='mb-0'>{message}</H1>;
};

export default Header;
