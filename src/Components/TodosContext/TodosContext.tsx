import React from 'react';
import { Todo } from '../../Types/Todo';
import { useLocalStorage } from '../../hooks/UseLocalStorege';

type TodosContextProps = {
  todos: Todo[];
  setTodos: ((todos: Todo[]) => void)
};

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
