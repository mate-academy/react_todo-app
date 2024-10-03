import React from 'react';
import { DispatchContext } from '../context/GlobalProvider';

export const useDispatch = () => React.useContext(DispatchContext);
