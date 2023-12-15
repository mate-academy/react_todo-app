import { LocalStorageName } from '../constants';

function getLocalStorageItem(key: LocalStorageName) {
  const itemJSON = localStorage.getItem(key);

  if (itemJSON) {
    return JSON.parse(itemJSON);
  }

  return null;
}

export default getLocalStorageItem;
