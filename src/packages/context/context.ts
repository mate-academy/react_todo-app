import { Dispatch, createContext } from 'react';
import { Action, Todo } from '../../libs/types';

export const TodosContext = createContext<Todo[] | []>([]);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});
