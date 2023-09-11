import { createContext } from 'react';
import { Todo } from '../types/Todo';
import { reducer } from '../functions/reducer';
import { useLocaleStorage } from '../functions/useLocaleStorage';
import { TodoConstextType } from '../types/TodoContext';

type Props = {
  children: React.ReactNode;
};

export const initialTodos: Todo[] = [];

export const TodoContext = createContext<TodoConstextType>({
  todos: initialTodos, dispatch: () => { },
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocaleStorage<Todo[]>(
    'todos', initialTodos, reducer,
  );

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
