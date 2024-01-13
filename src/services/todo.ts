import { Todo } from '../types/Todo';

export const deleteTodo = (id: number, previousTodos: Todo[]): Todo[] => {
  return previousTodos.filter(el => el.id !== id);
};

export const switchCompleted = (
  id: number,
  status: boolean,
  previousTodos: Todo[],
) => {
  const newTodos = [...previousTodos];
  const index = newTodos.findIndex(el => el.id === id);

  newTodos[index].completed = status;

  return newTodos;
};

export const switchToggleAll = (
  status: boolean,
  previousTodos: Todo[],
): Todo[] => {
  const newTodos = [...previousTodos];

  return newTodos.map(el => {
    const newTodo = el;

    newTodo.completed = !status;

    return newTodo;
  });
};
