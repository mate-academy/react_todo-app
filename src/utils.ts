import { Todo } from './components/TodosProvider';

export function checkAllTodosCompleted(todos: Todo[]) {
  if (todos.length === 0) {
    return false;
  }

  return todos.every(todo => todo.completed);
}

export function checkSomeTodosCompleted(todos: Todo[]) {
  if (todos.length === 0) {
    return false;
  }

  return todos.some(todo => todo.completed);
}
