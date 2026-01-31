import { Todo } from '../types/Todo';
import { loadTodos, saveTodos } from '../utils/todosStorage';

export function getTodos(): Todo[] {
  return loadTodos();
}

export function addTodo(title: string): Todo {
  const todos = loadTodos();

  const newTodo: Todo = {
    id: +new Date(),
    title: title.trim(),
    completed: false,
  };

  const updated = [...todos, newTodo];

  saveTodos(updated);

  return newTodo;
}

export function deleteTodo(todoId: number): void {
  const todos = loadTodos();

  const updated = todos.filter(todo => todo.id !== todoId);

  saveTodos(updated);
}

export function updateTodo(
  id: number,
  data: Partial<Pick<Todo, 'title' | 'completed'>>,
): Todo | null {
  const todos = loadTodos();

  const updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, ...data } : todo,
  );

  saveTodos(updatedTodos);

  return updatedTodos.find(todo => todo.id === id) ?? null;
}
