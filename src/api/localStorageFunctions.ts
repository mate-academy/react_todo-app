import { Todo } from '../types/Todo';

export const getTodos = (): Todo[] => {
  const prevTodosJSON = localStorage.getItem('todos');
  const prevTodos = prevTodosJSON ? JSON.parse(prevTodosJSON) : [];

  return prevTodos;
};

export const addTodo = (newTodo: Todo) => {
  const prevTodos = getTodos();
  const newTodos = [...prevTodos, newTodo];
  const newTodosJSON = JSON.stringify(newTodos);

  localStorage.setItem('todos', newTodosJSON);
};

export const deleteTodo = (id: number) => {
  const prevTodos = getTodos();
  const newTodos = prevTodos.filter(todo => todo.id !== id);
  const newTodosJSON = JSON.stringify(newTodos);

  localStorage.setItem('todos', newTodosJSON);
};

export const changeTodo = (
  id: number,
  data: Record<string, boolean | number | string>,
) => {
  const prevTodos = getTodos();
  const todoToChange = prevTodos.find(todo => todo.id === id);
  const newTodo = { ...todoToChange, data };
  const newTodos = prevTodos.map(todo => {
    if (todo.id !== id) {
      return todo;
    }

    return newTodo;
  });
  const newTodosJSON = JSON.stringify(newTodos);

  localStorage.setItem('todos', newTodosJSON);
};
