import React, { useMemo, useState } from 'react';
import { todos as todosFromServer } from '../../api/Todos';
import { Todo } from '../../types/Todo';

// hello;

interface ITodosContext {
  todosStatus: string,
  todos: Todo[],
  // filteredTodos: Todo[],
  setTodosStatus: React.Dispatch<React.SetStateAction<string>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  // setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  filterCallback: (item: Todo) => boolean,
  setFilterCallback:
  React.Dispatch<React.SetStateAction<(item: Todo) => boolean>>,
}

export const TodosContext = React.createContext<ITodosContext>({
  todosStatus: '',
  todos: [],
  // filteredTodos: [],
  setTodosStatus: () => { },
  setTodos: () => { },
  filterCallback: (item: Todo) => item.completed,
  setFilterCallback: () => { },
  // setFilteredTodos: () => {},
});

// export const TodosContext
// = React.createContext<ITodosContext>(undefined);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(todosFromServer);
  // const [filteredTodos, setFilteredTodos] = useState([...todos]);
  const [todosStatus, setTodosStatus] = useState('All');
  // const [filterCallback, setFilterCallback] = useState(() => true);
  const [filterCallback, setFilterCallback]
  = useState<(item: Todo) => boolean>((item) => (item.completed));

  const value = useMemo(() => ({
    todosStatus,
    todos,
    filterCallback,
    setFilterCallback,
    // filteredTodos,
    setTodosStatus,
    setTodos,
    // setFilteredTodos,
    // }), [todos, todosStatus, filteredTodos]);
  }), [todos, todosStatus, filterCallback]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
