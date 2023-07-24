/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useState, useMemo } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

type Props = {
  children: ReactNode;
};

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  status: Status.All,
});

export const TodoUpdateContext = React.createContext({
  addTodo: (_todo: Todo) => { },
  deleteTodo: (_todoId: string) => { },
  deleteCompletedTodos: () => { },
  updateTodo: (_todo: Todo) => { },
  changeTodosStatus: () => { },
  setStatus: (_status: Status) => { },
  isTodosCompleted: false,
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState(Status.All);

  const isTodosCompleted = todos.every(todo => todo.completed);

  const addTodo = (todo: Todo) => {
    setTodos(currentTodos => [...currentTodos, todo]);
  };

  const deleteTodo = (todoId: string) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const deleteCompletedTodos = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const updateTodo = (currentTodo: Todo) => {
    setTodos(currentTodos => currentTodos
      .map(todo => (todo.id === currentTodo.id ? currentTodo : todo)));
  };

  const changeTodosStatus = () => {
    setTodos(currentTodos => currentTodos.map(todo => (
      { ...todo, completed: !isTodosCompleted }
    )));
  };

  const value = useMemo(() => {
    return {
      addTodo,
      deleteTodo,
      deleteCompletedTodos,
      updateTodo,
      changeTodosStatus,
      setStatus,
      isTodosCompleted,
    };
  }, [isTodosCompleted]);

  return (
    <TodoUpdateContext.Provider value={value}>
      <TodoContext.Provider
        value={{ todos, status }}
      >
        {children}
      </TodoContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
