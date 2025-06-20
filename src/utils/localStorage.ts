export const saveToLocalStorage = <T>(key: string, value: T): void => {
  const json = JSON.stringify(value);

  localStorage.setItem(key, json);
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const json = localStorage.getItem(key);

    return json ? (JSON.parse(json) as T) : null;
  } catch (error) {
    return null;
  }
};
