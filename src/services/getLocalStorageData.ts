export function getLocalStorageData<T>(key: string, value: T) {
  const data = localStorage.getItem(key);

  if (!data) {
    localStorage.setItem(key, JSON.stringify(value));

    return value;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    return value;
  }
}
