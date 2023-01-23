import { useState } from 'react';

export const useLocalStorage = (key:string, initialValue: any) => {
  const firstValue = localStorage.getItem(key);
  const jsonValue = firstValue !== null
    ? JSON.parse(firstValue)
    : initialValue;
  const [data, setData] = useState(jsonValue);

  const save = (value: any) => {
    setData(value);
    localStorage.setItem('data', JSON.stringify(value));
  };

  return [data, save];
};
