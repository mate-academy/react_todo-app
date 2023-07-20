import { createContext } from 'react';
import { Todo } from '../types/Todo';

type SetTodos = (todos: Todo[]) => void;

export const TodosContext = createContext<Todo[]>([]);
export const SetTodosContext = createContext({} as SetTodos);
