import React, { createContext, useEffect, useReducer } from 'react';
import { todosReducer } from '../reducers/todoReducer';
import { Todo } from '../types/Todo';

type TodosContentType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  renameTodo: (id: number, newTitle: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = createContext<TodosContentType | undefined>(
  undefined,
);

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, [], () => {
    const items = localStorage.getItem('todos');

    return items ? JSON.parse(items) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    dispatch({ type: 'ADD', payload: title });
  };

  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const toggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL' });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const renameTodo = (id: number, newTitle: string) => {
    dispatch({ type: 'RENAME', payload: { id, title: newTitle } });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
        renameTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
