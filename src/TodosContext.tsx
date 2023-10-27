import { createContext } from 'react';
import { useLocaleStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { Todos } from './types/Todos';

export const TodosContext = createContext<Todos>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
