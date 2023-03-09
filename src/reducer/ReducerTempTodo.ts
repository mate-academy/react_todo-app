import { INITIAL_STATE_TEMPTODO } from '../constants/initial_state_newTodo';
import { ReducerTempTodoType } from '../enums/ReducerTempTodoType';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

export const reducer = (
  tempTodo: Todo,
  action: Action,
) => {
  switch (action.type) {
    case ReducerTempTodoType.RESET:
      return INITIAL_STATE_TEMPTODO;
    case ReducerTempTodoType.TITLE:
      return { ...tempTodo, title: action.newTitle };
    case ReducerTempTodoType.ID:
      return { ...tempTodo, id: action.newId };
    default:
      return { ...tempTodo };
  }
};
