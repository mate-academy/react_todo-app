import { Todo } from '../types/Todo';

export const getNumberActiveTodo = (todos: Todo[]) => {
  let number = 0;

  todos.forEach(todo => {
    if (!todo.completed) {
      number += 1;
    }
  });

  return number;
};
