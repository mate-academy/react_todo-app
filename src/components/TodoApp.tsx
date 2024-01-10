import React, { useMemo, useState } from 'react';
import baseList from '../api/baseTodos.json';

import { Todo } from '../types/Todo';
import { FiltredBy } from '../types/FiltredBy';

import { TodosContext } from '../context/TodosContext';
import { removeExtraSpaces } from '../utils/removeExtraSpaces';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode;
};

export const TodoApp: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', baseList);

  const [filterParam, setFilterParams] = useState<FiltredBy>(FiltredBy.all);

  const leftTodo = [...todos].filter(todo => !todo.completed).length;

  const filtredTodos = (): Todo[] => {
    switch (filterParam) {
      case FiltredBy.active:
        return [...todos].filter(todo => !todo.completed);

      case FiltredBy.completed:
        return [...todos].filter(todo => todo.completed);

      default:
        return [...todos];
    }
  };

  const addNewTodo = (todoTitle: string) => {
    const newTodo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos([...todos].filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos([...todos].filter(todo => !todo.completed));
  };

  const updateTodo = (currentId: number, updatedTitle: string) => {
    const updatedTodo = [...todos].map(todo => {
      if (todo.id === currentId) {
        const newTodo = removeExtraSpaces(updatedTitle);

        return { ...todo, title: newTodo };
      }

      return todo;
    });

    setTodos(updatedTodo);
  };

  const handleCompletedChange = (currentId: number) => {
    const newTodos = [...todos].map(todo => {
      if (todo.id === currentId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleToggleAll = () => {
    if (leftTodo === 0) {
      setTodos([...todos].map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos([...todos].map(todo => ({ ...todo, completed: true })));
    }
  };

  const value = useMemo(() => ({
    todos,
    addNewTodo,
    deleteTodo,
    filtredTodos,
    handleCompletedChange,
    leftTodo,
    filterParam,
    setFilterParams,
    clearCompleted,
    handleToggleAll,
    updateTodo,
  }), [todos, filterParam]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
