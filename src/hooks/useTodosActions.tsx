import { useContext } from 'react';
import { DispatchContext } from '../context/TodoContext';

export const useTodosActions = () => useContext(DispatchContext);
