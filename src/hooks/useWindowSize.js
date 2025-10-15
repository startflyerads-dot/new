import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const isClient = typeof window !== 'undefined';
  const getSize = () => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  });

  const [size, setSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return undefined;
    const handleResize = () => setSize(getSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return size;
};

export default useWindowSize;