/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, createContext, ReactNode } from 'react';
import { Todo } from '../Types/Todo';
import { Filter } from '../Types/Filter';

export const MyContext = createContext<any>(null);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider = ({ children }: MyProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);

  function deleteTodo(id: number) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }

  return (
    <MyContext.Provider
      value={{
        todos,
        setTodos,
        title,
        setTitle,
        filter,
        setFilter,
        editingTodoId,
        setEditingTodoId,
        deleteTodo,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
