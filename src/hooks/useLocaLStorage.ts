interface IUseLocalStorage {
  setItem: (value: unknown) => void;
  getItem: () => unknown;
  removeItem: () => void;
}

const useLocaLStorage = (key: string): IUseLocalStorage => {
  const setItem = (value: unknown): void => {
    typeof value === 'string'
      ? localStorage.setItem(key, value)
      : localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (): unknown => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  };

  const removeItem = (): void => localStorage.removeItem(key);

  return { setItem, getItem, removeItem };
};

export default useLocaLStorage;
