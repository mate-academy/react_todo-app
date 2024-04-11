import { actions } from '../vars/ActionsTypes';
import { Dispatch } from '../types/Dispatch';

export const toggleTodoCompleted = (id: number, dispatch: Dispatch) => {
  dispatch({
    type: actions.TOGGLE_TODO,
    payload: id,
  });
};
