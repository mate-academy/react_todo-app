import { Todo } from '../types/Todo';

const createId = () => +new Date();
const TODO_STORAGE_KEY = 'todos';

const saveAll = (todos: Todo[]) => {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
};

const getAll: () => Todo[] = () => {
  return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) as string) || [];
};

const get: (id: number) => Todo | undefined = (
  id: number,
): Todo | undefined => {
  return getAll().find(todo => todo.id === id);
};

const create = (title: string): Todo => {
  const newTodo: Todo = {
    id: createId(),
    title: title,
    completed: false,
  };

  return newTodo;
};

// const post = (title: string): Todo => {
//   const newTodo: Todo = {
//     id: createId(),
//     title: title,
//     completed: false,
//   };

//   const todos = getAll();

//   todos.push(newTodo);
//   save(todos);

//   return newTodo;
// };

// function patch(
//   todo: Todo,
//   updatedFields: Partial<Pick<Todo, keyof Todo>>,
// ): Todo {
//   const todos = getAll();

//   const updatedTodo = {
//     ...todo,
//     ...updatedFields,
//   };

//   todos.push(updatedTodo);
//   save(todos);

//   return updatedTodo;
// }

// const remove = (id: number) => {
//   save(getAll().filter(todo => todo.id !== id));
// };

export const todoService = {
  create,
  get,
  getAll,
  saveAll,
};
