import React, { useEffect, useState } from 'react';
import { Todo } from './types';

type ContextProps = {
  todo: Todo[],
  setTodo: (todo: Todo[]) => void,
  finishedTodos: Todo[],
  setFinishedTodos: (todo: Todo[]) => void,
  activeTodos: Todo[],
  setActiveTodos: (todo: Todo[]) => void,
  todoses: Todo[],
  setVisibleTodoses: (todo: Todo[]) => void,
};

export const TodoContext = React.createContext<ContextProps>({
  todo: [],
  setTodo: () => { },
  finishedTodos: [],
  setFinishedTodos: () => { },
  activeTodos: [],
  setActiveTodos: () => { },
  todoses: [],
  setVisibleTodoses: () => { },
});

export const TodoProvider: React.FC = ({ children }) => {
  const [todo, setTodo] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todo') || '[]'),
  );
  const [todoses, setVisibleTodoses] = useState<Todo[]>([]);
  const [finishedTodos, setFinishedTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));

    setFinishedTodos(todo.filter(elem => elem.completed));
    setActiveTodos(todo.filter(elem => !elem.completed));
  }, [todo]);

  const contextValue = {
    todo,
    setTodo,
    finishedTodos,
    setFinishedTodos,
    activeTodos,
    setActiveTodos,
    todoses,
    setVisibleTodoses,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
