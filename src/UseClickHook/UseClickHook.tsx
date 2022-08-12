import { useState, useEffect } from 'react';

export const useClickHook = (type: string) => {
  const [click, setClick] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setClick(type);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [type]);

  return click;
};
