import { Todo } from '../types/Todo';

export const getUpdatedTodosSet = (
  currentTodos: Todo[] | null,
  updatedTodos: Todo[],
): Todo[] => {
  return currentTodos?.map(todo => {
    const toggledTodo = updatedTodos.find(updatedTodo => (
      updatedTodo.id === todo.id
    ));

    return toggledTodo || todo;
  }) || [];
};
