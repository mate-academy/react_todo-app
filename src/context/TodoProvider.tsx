import { ReactNode, useEffect, useReducer } from 'react';
import { TodoContext } from './TodoContext';
import { State, todoReducer } from '../reduces/TodoReducer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, save] = useLocalStorage<Todo[]>('todos', []);
  const initialState: State = {
    todos,
    filterStatus: 'ALL',
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    save(state.todos);
  }, [state, save]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
