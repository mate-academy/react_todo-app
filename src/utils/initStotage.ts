export function initStotage<T>(key: string, initialValue: T): T {
  const data = localStorage.getItem(key);

  if (data === null) {
    return initialValue;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    localStorage.removeItem(key);

    return initialValue;
  }
}
