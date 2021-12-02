export const getLocalStorageItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

export const setLocalStorageItem = (key, value) => {
  return window.localStorage.setItem(key, JSON.stringify(value));
};
