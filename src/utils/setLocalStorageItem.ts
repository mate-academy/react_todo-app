import { LocalStorageName } from '../constants';

function setLocalStorageItem(key: LocalStorageName, item: unknown) {
  const itemJSON = JSON.stringify(item);

  localStorage.setItem(key, itemJSON);
}

export default setLocalStorageItem;
