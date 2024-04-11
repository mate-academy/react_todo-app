import { actions } from '../vars/ActionsTypes';
import { Dispatch } from '../types/Dispatch';

export const handeClearCompletedTodos = (dispatch: Dispatch) => {
  dispatch({
    type: actions.CLEAR_COMPLETED,
  });
};
