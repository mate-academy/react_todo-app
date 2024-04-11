import { actions } from '../vars/ActionsTypes';
import { Dispatch } from '../types/Dispatch';

export const setFilter = (filter: string, dispatch: Dispatch) => {
  dispatch({
    type: actions.SET_FILTER,
    payload: filter,
  });
};
