import { useEffect, useState } from 'react';

export const useLocalStorage = (key, value) => {
  const [storage, setStorage] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? value
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storage))
  }, [storage, key]);
  
  return [storage, setStorage]
}
