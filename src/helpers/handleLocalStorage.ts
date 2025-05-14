/* eslint-disable no-console */
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export async function loadFromLocalStorage<T>(): Promise<T> {
  try {
    await wait(300);
    const item = localStorage.getItem('todos');

    return item ? (JSON.parse(item) as T) : ([] as T);
  } catch (error) {
    console.error('Error reading todos from localStorage:', error);

    return [] as T;
  }
}

export function saveToLocalStorage<T>(value: T) {
  try {
    localStorage.setItem('todos', JSON.stringify(value));
  } catch (error) {
    console.error('Error saving todos from localStorage:', error);
  }
}
