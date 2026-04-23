export type Todo = {
  title: string;
  completed: boolean;
  id: number;
};

export const isTodo = (value: unknown): value is Todo => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('title' in value) ||
    !('completed' in value) ||
    !('id' in value)
  ) {
    return false;
  }

  return !(
    typeof value.title !== 'string' ||
    typeof value.completed !== 'boolean' ||
    typeof value.id !== 'number'
  );
};

export const isTodosArray = (todos: unknown): todos is Todo[] => {
  if (!Array.isArray(todos)) {
    return false;
  }

  let isTodos = true;

  todos.forEach(todo => {
    if (!isTodo(todo)) {
      isTodos = false;
    }
  });

  return isTodos;
};
