export function saveStotage<T>(
  key: string,
  newValue: T,
) {
  return localStorage.setItem(key, JSON.stringify(newValue));
}
