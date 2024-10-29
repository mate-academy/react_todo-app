import { Action } from '../Store';

export const onAutoCloseNotification = (dispatch: (action: Action) => void) => {
  setTimeout(() => {
    dispatch({ type: 'closeNotification' });
  }, 3000);
};
