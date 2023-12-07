export function getStorageData() {
  const storedData = localStorage.getItem('todos');

  if (storedData === null) {
    return [];
  }

  try {
    const data = JSON.parse(storedData);

    return data;
  } catch (err) {
    return [];
  }
}
