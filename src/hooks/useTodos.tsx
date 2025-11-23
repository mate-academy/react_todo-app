import { useContext } from 'react';
import { StateContext } from '../context/TodoContext';

export const useTodos = () => useContext(StateContext);
