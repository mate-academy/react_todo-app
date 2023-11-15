// import { createContext } from 'react';
import React from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type PropsCont = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  addTodoHandler: (newTodo: Todo) => void;
  updateTodoHandler: (updatedTodo: Todo) => void;
  deleteTodoHandler: (todoId: number) => void;
};

export const TodosContext = React.createContext<PropsCont>({
  todos: [],
  setTodos: () => { },
  addTodoHandler: () => { },
  updateTodoHandler: () => { },
  deleteTodoHandler: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const addTodoHandler = (newTodo: Todo) => {
    const newTodos: Todo[] = [...todos, newTodo];

    setTodos(newTodos);
  };

  const updateTodoHandler = (updatedTodo: Todo) => {
    const updatedTodos = todos
      .map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));

    setTodos(updatedTodos);
  };

  const deleteTodoHandler = (todoId: number) => {
    const deletedTodos = todos
      .filter(todo => (todo.id !== todoId));

    setTodos(deletedTodos);
  };

  const value = {
    todos,
    setTodos,
    addTodoHandler,
    updateTodoHandler,
    deleteTodoHandler,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
