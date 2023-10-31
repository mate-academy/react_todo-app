import React, { useState, useMemo } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodosContextType {
  todos: Todo[],
  setTodos: (v: Todo[]) => void;
  isCheckedAll: boolean,
  setIsCheckedAll: React.Dispatch<React.SetStateAction<boolean>>,
  handleStatus: (status: Status) => void,
  selectedStatus: Status,
  filteredTodos: Todo[]
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => { },
  isCheckedAll: false,
  setIsCheckedAll: () => { },
  handleStatus: () => { },
  selectedStatus: Status.All,
  filteredTodos: [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(Status.All);

  const handleStatus = (status: Status) => {
    setSelectedStatus(status);
  };

  const handleFilterTodos = (status: Status, filterTodos: Todo[]) => {
    switch (status) {
      case Status.All:
        return filterTodos;
      case Status.Active:
        return filterTodos.filter((todo: Todo) => !todo.completed);
      case Status.Completed:
        return filterTodos.filter((todo: Todo) => todo.completed === true);
      default:
        return filterTodos;
    }
  };

  const filteredTodos = handleFilterTodos(selectedStatus, todos);

  const value = useMemo(() => ({
    todos,
    isCheckedAll,
    filteredTodos,
    selectedStatus,
    setTodos,
    handleStatus,
    setIsCheckedAll,
  }), [todos, isCheckedAll, selectedStatus]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
