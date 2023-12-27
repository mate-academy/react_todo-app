import { Todo } from '../types/Todo';

export function editTodo(
  todos: Todo[],
  payload: { id: number, newTitle: string },
) {
  const { id, newTitle } = payload;

  return todos.map(todo => (
    todo.id === id
      ? { ...todo, title: newTitle }
      : todo
  ));
}
