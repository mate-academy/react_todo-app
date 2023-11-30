import React from 'react';
// import { Todo } from './types/Todo';
import { todos } from './api/todos';

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext(todos);

export const TodosProvider: React.FC<Props> = ({ children }) => {
  // const [todos, setTodos] = useState();

  return (
    <TodosContext.Provider value={todos}>
      {children}
    </TodosContext.Provider>
  );
};
