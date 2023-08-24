import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Отримання збереженого значення з localStorage при завантаженні сторінки
  const storageValue = localStorage.getItem(key);
  const initial = storageValue ? JSON.parse(storageValue) : initialValue;

  // Створення стану, що використовується для зберігання значення
  const [value, setValue] = useState<T>(initial);

  // Оновлення збереженого значення в localStorage
  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue] as const;
}
