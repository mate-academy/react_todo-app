import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
) : [T, (value: T) => void] => {
  const [data, setData] = useState<T>(
    JSON.parse(localStorage.getItem(key)!) || initialValue,
  );

  const saveData = (storageData: T) => {
    setData(storageData);
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    localStorage.setItem(key, JSON.stringify(storageData));
  };

  return [data, saveData];
};
