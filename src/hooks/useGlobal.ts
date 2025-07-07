import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Context/state';

export const useGlobalState = () => useContext(StateContext);
export const useGlobalDispatch = () => useContext(DispatchContext);
