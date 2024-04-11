import { Dispatch } from '../types/Dispatch';
import { actions } from '../vars/ActionsTypes';

export const addTodo = (title: string, dispatch: Dispatch) => {
  const todo = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
  };

  dispatch({
    type: actions.ADD_TODO,
    payload: todo,
  });
};
