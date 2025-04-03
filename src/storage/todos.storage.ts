import { Todo } from '../types/Todo';

const KEY = 'todos';

function getFromLocalStorage(): Todo[] {
  const strData = localStorage.getItem(KEY);

  if (typeof strData === 'string') {
    return JSON.parse(strData);
  }

  return [];
}

function initLocalStorage() {
  const checkStorage = getFromLocalStorage();

  if (!checkStorage.length) {
    localStorage.setItem(KEY, JSON.stringify([]));
  }

  return;
}

function postToLocalStorage(data: Todo) {
  const currentData = getFromLocalStorage();

  currentData.push(data);
  localStorage.setItem(KEY, JSON.stringify(currentData));
}

function patchToLocalStorage(newData: Todo) {
  const currentData = getFromLocalStorage();
  const updateData = currentData.map(data => {
    if (data.id !== newData.id) {
      return data;
    }

    return { ...data, ...newData };
  });

  localStorage.setItem(KEY, JSON.stringify(updateData));
}

function deleteFromLocalStorage(dataId: number) {
  const currentData = getFromLocalStorage();
  const deleteData = currentData.filter(data => data.id !== dataId);

  localStorage.setItem(KEY, JSON.stringify(deleteData));
}

export const todosStorage = {
  init: initLocalStorage,
  get: getFromLocalStorage,
  post: postToLocalStorage,
  patch: patchToLocalStorage,
  delete: deleteFromLocalStorage,
};
