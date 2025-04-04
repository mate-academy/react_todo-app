import { Todo } from '../types/Todo';

export const callbacks = {
  getTodos: (): Todo[] => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  },
  addTodos: (todo: Todo) => {
    localStorage.setItem(
      'todos',
      JSON.stringify([...callbacks.getTodos(), todo]),
    );
  },
  updateTodos: (todo: Todo) => {
    const todos = callbacks.getTodos();
    const todoIndex = todos.findIndex(t => t.id === todo.id);

    localStorage.setItem(
      'todos',
      JSON.stringify([
        ...todos.slice(0, todoIndex),
        todo,
        ...todos.slice(todoIndex + 1),
      ]),
    );

    return todo;
  },
  setTodos: (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },
};
