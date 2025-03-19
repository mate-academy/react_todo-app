import React from 'react';
import { DispatchContext, StateContext } from './MainContext';

export const useGlobalState = () => React.useContext(StateContext);
export const useDispatch = () => React.useContext(DispatchContext);
