import { DEFAULT_STATE_NEW_USER } from '../constants/DEFAULT_STATE_NEW_USER';
import { ReducerNewUserType } from '../enums/ReducerNewUserType';
import { Action } from '../types/Action';
import { User } from '../types/User';

export function reducerNewUser(state: User, action: Action) {
  switch (action.type) {
    case ReducerNewUserType.RESET:
      return DEFAULT_STATE_NEW_USER;

    case ReducerNewUserType.ID:
      return { ...state, id: action.newID };

    case ReducerNewUserType.NAME:
      return { ...state, name: action.newName };

    case ReducerNewUserType.EMAIL:
      return { ...state, email: action.newEmail };

    default:
      return { ...state };
  }
}
