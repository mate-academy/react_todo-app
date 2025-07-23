import { useContext } from 'react';
import { DispatchContext, StateContext } from '../GlobalProvider';
import { FocusContext } from '../FocusContext';

export const useDispatch = () => useContext(DispatchContext);
export const useGlobalState = () => useContext(StateContext);
export const useInputRef = () => useContext(FocusContext);
