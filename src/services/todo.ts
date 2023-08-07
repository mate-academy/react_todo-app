import { Todo } from '../types/Todo';

export function getRandomId() {
  return +new Date();
}

export function haveAnyCompletedTodo(todos: Todo[]) {
  return todos.some(todo => todo.completed === true);
}

export function getCompletedTodos(todos: Todo[]) {
  return todos.filter(todo => todo.completed);
}

export function removeTodo(todos: Todo[], todoId: number) {
  return todos.filter(todo => todo.id !== todoId);
}
