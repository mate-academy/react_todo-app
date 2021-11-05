import { useEffect, useState } from 'react';

export const useLocalStorage = (key, value) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? value,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};
