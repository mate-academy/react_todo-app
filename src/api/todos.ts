// crud operations with localstorage for todos

import { Todo } from '../components/TodosProvider';

const TODOS_STORAGE_NAME = 'todos';

// function timeout(time: number) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }

function saveTodosToStorage(todos: Todo[]) {
  if (todos.length === 0) {
    localStorage.setItem(TODOS_STORAGE_NAME, '[]');
  } else {
    localStorage.setItem(TODOS_STORAGE_NAME, JSON.stringify(todos));
  }
}

export function getTodosFromStorage(): Todo[] {
  const todosFromStorage = localStorage.getItem(TODOS_STORAGE_NAME);

  if (!todosFromStorage) {
    localStorage.setItem(TODOS_STORAGE_NAME, '[]');
  }

  return todosFromStorage ? JSON.parse(todosFromStorage) : [];
}

export function setTodosInStorage(todos: Todo[]) {
  saveTodosToStorage(todos);
}

export function addTodoToStorage(todo: Todo) {
  const todosFromStorage = getTodosFromStorage();

  todosFromStorage.push(todo);

  saveTodosToStorage(todosFromStorage);

  return todo;
}

export function deleteTodoFromStorage(todoId: Todo['id']) {
  const todosFromStorage = getTodosFromStorage();

  const filteredTodosList = todosFromStorage.filter(todo => todo.id !== todoId);

  saveTodosToStorage(filteredTodosList);
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

  saveTodosToStorage(updatedTodosList);
}
