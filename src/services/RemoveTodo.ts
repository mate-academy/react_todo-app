import { Dispatch } from '../types/Dispatch';
import { actions } from '../vars/ActionsTypes';

export const removeTodo = (id: number, dispatch: Dispatch) => {
  dispatch({
    type: actions.REMOVE_TODO,
    payload: id,
  });
};
