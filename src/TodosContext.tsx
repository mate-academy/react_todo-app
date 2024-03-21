import React, { useState } from 'react';
import { Todos } from './types/types';
import { useLocalStorage } from './components/local/local';
import { filterTodo } from './services/filter';
import { Status } from './services/type-Filter';

type TodosContextType = {
  todos: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  handleCompleted: (id: number) => void;
  handleCompleteAll: () => void;
  filteredTodo: Todos[];
  setFilterType: React.Dispatch<React.SetStateAction<Status>>;
  filterType: Status;
};

const initialTodosContextValue: TodosContextType = {
  todos: [],
  setTodos: () => {},
  handleCompleted: () => {},
  handleCompleteAll: () => {},
  filteredTodo: [],
  setFilterType: () => {},
  filterType: Status.All,
};

export const TodosContext = React.createContext<TodosContextType>(
  initialTodosContextValue,
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todos[]>('todos', []);
  const [filterType, setFilterType] = useState<Status>(Status.All);

  const filteredTodo = filterTodo(todos, filterType);

  const handleCompleted = (id: number) => {
    const newStateTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(newStateTodos);
  };

  const handleCompleteAll = () => {
    const hasIncomplete = todos.some(todo => !todo.completed);

    const newStateTodos = todos.map(todo => ({
      ...todo,
      completed: !!hasIncomplete,
    }));

    setTodos(newStateTodos);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        handleCompleted,
        handleCompleteAll,
        filteredTodo,
        setFilterType,
        filterType,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
