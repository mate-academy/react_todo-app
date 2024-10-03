import React from 'react';
import { StateContext } from '../context/GlobalProvider';

export const useGlobalState = () => React.useContext(StateContext);
