import { Todo } from '../types/Todo';

const KEY = 'todos';

async function getFromLocalStorage(): Promise<Todo[]> {
  const strData = localStorage.getItem(KEY);

  if (typeof strData === 'string') {
    return JSON.parse(strData);
  }

  return [];
}

async function postToLocalStorage(data: Todo) {
  const currentData = await getFromLocalStorage();

  currentData.push(data);
  localStorage.setItem(KEY, JSON.stringify(currentData));
}

async function patchToLocalStorage(newData: Todo) {
  const currentData = await getFromLocalStorage();
  const updateData = currentData.map(data => {
    if (data.id !== newData.id) {
      return data;
    }

    return { ...data, ...newData };
  });

  localStorage.setItem(KEY, JSON.stringify(updateData));
}

async function deleteFromLocalStorage(dataId: number) {
  const currentData = await getFromLocalStorage();
  const deleteData = currentData.filter(data => data.id !== dataId);

  localStorage.setItem(KEY, JSON.stringify(deleteData));
}

export const todosStorage = {
  get: getFromLocalStorage,
  post: postToLocalStorage,
  patch: patchToLocalStorage,
  delete: deleteFromLocalStorage,
};
