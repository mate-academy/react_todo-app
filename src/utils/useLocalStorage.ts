import { useState } from 'react';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
) : [T, (value: T) => void] => {
  const [datas, setDatas] = useState<T>(
    JSON.parse(localStorage.getItem(key)!) || initialValue,
  );

  const saveDatas = (storageDatas: T) => {
    setDatas(storageDatas);
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    localStorage.setItem(key, JSON.stringify(storageDatas));
  };

  return [datas, saveDatas];
};
