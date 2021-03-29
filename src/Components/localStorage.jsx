import { useEffect } from 'react';

export const useSetLocalStorage = (key, value) => {
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value]);
}

export const useGetLocalStorage = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return null;
  }
}
