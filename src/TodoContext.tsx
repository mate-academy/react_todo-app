import React, { useEffect, useState } from 'react';
import { Todo } from './types';

type ContextProps = {
  todos: Todo[],
  setTodos: (todo: Todo[]) => void,
  finishedTodos: Todo[],
  setFinishedTodos: (todo: Todo[]) => void,
  activeTodos: Todo[],
  setActiveTodos: (todo: Todo[]) => void,
  visibleTodoses: Todo[],
  setVisibleTodoses: (todo: Todo[]) => void,
};

export const TodoContext = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => { },
  finishedTodos: [],
  setFinishedTodos: () => { },
  activeTodos: [],
  setActiveTodos: () => { },
  visibleTodoses: [],
  setVisibleTodoses: () => { },
});

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todo') || '[]'),
  );
  const [visibleTodoses, setVisibleTodoses] = useState<Todo[]>([]);
  const [finishedTodos, setFinishedTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));

    setFinishedTodos(todos.filter(elem => elem.completed));
    setActiveTodos(todos.filter(elem => !elem.completed));
  }, [todos]);

  const contextValue = {
    todos,
    setTodos,
    finishedTodos,
    setFinishedTodos,
    activeTodos,
    setActiveTodos,
    visibleTodoses,
    setVisibleTodoses,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
