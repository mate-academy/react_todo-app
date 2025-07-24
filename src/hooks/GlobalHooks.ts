import { useContext } from 'react';
import {
  DispatchContext,
  FocusContext,
  StateContext,
} from '../GlobalContextProvider';

export const useDispatch = () => useContext(DispatchContext);
export const useGlobalState = () => useContext(StateContext);
export const useHeaderInputRef = () => useContext(FocusContext);
