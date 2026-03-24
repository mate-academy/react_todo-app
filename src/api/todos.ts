// crud operations with localstorage for todos

import { Todo } from '../components/TodosProvider';

const TODOS_STORAGE_NAME = 'todos';

// function timeout(time: number) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }

export function getTodosFromStorage(): Todo[] {
  return JSON.parse(localStorage.getItem(TODOS_STORAGE_NAME) ?? '[]');
}

export function setTodosInStorage(todos: Todo[]) {
  localStorage.setItem(TODOS_STORAGE_NAME, JSON.stringify(todos));
}

export function addTodoToStorage(todo: Todo) {
  const todosFromStorage = getTodosFromStorage();

  todosFromStorage.push(todo);

  localStorage.setItem(TODOS_STORAGE_NAME, JSON.stringify(todosFromStorage));

  return todo;
}

export function deleteTodoFromStorage(todoId: Todo['id']) {
  const todosFromStorage = getTodosFromStorage();

  const filteredTodosList = todosFromStorage.filter(todo => todo.id !== todoId);

  localStorage.setItem(TODOS_STORAGE_NAME, JSON.stringify(filteredTodosList));
}

export function updateTodoInStorage(
  todoId: Todo['id'],
  payload: Partial<Omit<Todo, 'id'>>,
) {
  const todosFromStorage = getTodosFromStorage();

  const updatedTodosList = todosFromStorage.map(todo => {
    if (todo.id === todoId) {
      return { ...todo, ...payload };
    }

    return todo;
  });

  localStorage.setItem(TODOS_STORAGE_NAME, JSON.stringify(updatedTodosList));
}
