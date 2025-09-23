import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/UseLocalStorage';
import { FilterTypes } from '../types/FilterTypes';

interface TodoContextType {
  todos: Todo[];
  addTodo: (value: Todo) => void;
  updateTodos: (value: Todo) => void;
  deleteTodo: (id: number) => void;
  disabledButton: boolean;
  setFilterType: (currentFilterType: FilterTypes) => void;
  selectedFilter: FilterTypes;
  filteredTodos: Todo[];
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  updateTodos: () => {},
  deleteTodo: () => {},
  disabledButton: false,
  setFilterType: () => {},
  selectedFilter: FilterTypes.All,
  filteredTodos: [],
});

export const TodoProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [disabledButton, setDisabledButton] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FilterTypes>(
    FilterTypes.All,
  );

  useEffect(() => {
    const isAllCompleted =
      [...todos].filter(todo => todo.completed).length === todos.length;

    if (isAllCompleted) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [todos, setDisabledButton]);

  const filteredTodos = useMemo(() => {
    if (selectedFilter === 'Active') {
      return [...todos].filter(todo => !todo.completed);
    }

    if (selectedFilter === 'Completed') {
      return [...todos].filter(todo => todo.completed);
    }

    return todos;
  }, [selectedFilter, todos]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      addTodo: (newTodo: Todo) => {
        setTodos([...todos, newTodo]);
      },

      deleteTodo: (todoId: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
      },

      updateTodos: (todoToUpdate: Todo) => {
        setTodos(prev => {
          return prev.map(currentTodo => {
            if (currentTodo.id === todoToUpdate.id) {
              return {
                ...currentTodo,
                completed: todoToUpdate.completed,
                title: todoToUpdate.title,
              };
            }

            return currentTodo;
          });
        });
      },

      disabledButton: disabledButton,

      setFilterType: (currentFilterType: FilterTypes) => {
        setSelectedFilter(currentFilterType);
      },

      selectedFilter: selectedFilter,

      filteredTodos: filteredTodos,
    }),
    [todos, setTodos, disabledButton, selectedFilter, filteredTodos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
