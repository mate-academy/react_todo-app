export const saveToLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const savedValue = localStorage.getItem(key);

  if (savedValue === null) {
    return defaultValue;
  }

  try {
    return JSON.parse(savedValue);
  } catch (e) {
    localStorage.removeItem(key);

    return defaultValue;
  }
};
