import { Todo, TodoId } from '../types/ Todo';
export const addTodoHandler = (todos: Todo[], title: string): Todo[] => {
  const trimmed = title.trim();

  if (!trimmed) {
    return todos;
  }

  return [...todos, { id: Date.now(), title: trimmed, completed: false }];
};

export const toggleTodoHandler = (todos: Todo[], id: TodoId): Todo[] =>
  todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );

export const deleteTodoHandler = (todos: Todo[], id: TodoId): Todo[] =>
  todos.filter(todo => todo.id !== id);

export const updateTodoHandler = (
  todos: Todo[],
  id: TodoId,
  newTitle: string,
): Todo[] => {
  const trimmed = newTitle.trim();

  if (!trimmed) {
    return todos.filter(t => t.id !== id);
  }

  return todos.map(todo =>
    todo.id === id ? { ...todo, title: trimmed } : todo,
  );
};

export const toggleAllHandler = (todos: Todo[]): Todo[] => {
  const allCompleted = todos.every(t => t.completed);

  return todos.map(t => ({ ...t, completed: !allCompleted }));
};

export const clearCompletedHandler = (todos: Todo[]): Todo[] =>
  todos.filter(t => !t.completed);
