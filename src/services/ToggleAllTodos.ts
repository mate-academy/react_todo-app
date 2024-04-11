import { actions } from '../vars/ActionsTypes';
import { Dispatch } from '../types/Dispatch';

export const toggleAllTodosCompleted = (dispatch: Dispatch) => {
  dispatch({
    type: actions.TOGGLE_ALL_TODOS,
  });
};
