import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoActions } from '../types/TodoActions';
import { useLocalStorage } from '../hooks/UseLocalStorage';

type Props = {
  todos: Todo[];
  setTodos: (todosToSet: Todo[]) => void;
  selectedFilter: TodoActions;
  setSelectedFilter: (action: TodoActions) => void;
  isShownTodos: Todo[]
};

export const TodosContext = React.createContext<Props>({
  todos: [],
  setTodos: () => {},
  selectedFilter: TodoActions.All,
  setSelectedFilter: () => {},
  isShownTodos: [],
});

type PropsWithChildren = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  // eslint-disable-next-line
  const [selectedFilter, setSelectedFilter] = useState<TodoActions>(TodoActions.All);

  const isShownTodos = todos.filter(todo => {
    switch (selectedFilter) {
      case TodoActions.Active:
        return !todo.completed;
      case TodoActions.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        selectedFilter,
        setSelectedFilter,
        isShownTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
