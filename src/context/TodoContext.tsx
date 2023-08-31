import { createContext } from 'react';
import { Todo } from '../types/Todo';
import { useLocaleStorage } from '../functions/useLocalStorage';
import { reducer } from '../functions/reducer';
import { TodoConstextType } from '../types/TodoContex';

// export enum Status {
//   All = 'all',
//   Completed = 'completed',
//   Active = 'active',
// }

type Props = {
  children: React.ReactNode;
};

export const initialTodos: Todo[] = [];

export const TodoContext = createContext<TodoConstextType>({
  todos: initialTodos, dispatch: () => { },
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocaleStorage<Todo[]>(
    'todos', initialTodos, reducer, // JSON.parse(localStorage.getItem('todos')) ?? [],
  );

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
