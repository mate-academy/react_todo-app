import React, { useMemo, useState } from 'react';
import todosFromServer from '../api/todo';
import { Todo } from '../types/Todo';
import { useLocaleStorage } from '../hooks/useLocalStorage';

export const TodosContext = React.createContext<{
  todos: Todo[];
  setTodo: (todos: Todo[]) => void;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  visibleTodos: Todo[];
}>({
  todos: [],
  setTodo: () => { },
  filter: 'all',
  setFilter: () => { },
  visibleTodos: [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodo] = useLocaleStorage<Todo[]>(
    'todos', [...todosFromServer],
  );
  const [filter, setFilter] = useState('all');

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default: return true;
      }
    });
  }, [todos, filter]);

  const value = useMemo(() => {
    return {
      todos,
      setTodo,
      filter,
      setFilter,
      visibleTodos,
    };
  }, [
    todos, setTodo, filter, setFilter, visibleTodos,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
