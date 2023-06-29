import { Todo } from '../types/Todo';
import { LocationEnum } from '../types/LocationEnum';

export const getVisibleTodos = (locationPath: string, todosArr: Todo[]) => {
  switch (locationPath) {
    case LocationEnum.active:
      return todosArr.filter(todo => !todo.completed);
    case LocationEnum.completed:
      return todosArr.filter(todo => todo.completed);
    default:
      return todosArr;
  }
};
