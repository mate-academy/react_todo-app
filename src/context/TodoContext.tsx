/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useState,
  useMemo,
  PropsWithChildren,
  createContext,
  FC,
} from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const TODO_KEY = 'todos';

interface Context {
  todos: Todo[];
  setTodos: (todo: Todo[]) => void,
  status: Status;
  setStatus: (status: Status) => void;
  isTodosCompleted: boolean;
  addTodo: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;
  deleteCompletedTodos: () => void;
  updateTodo: (
    todoId: string,
    fieldToUpdate: string,
    newValue: unknown,
  ) => void;
  changeTodosStatus: () => void;
}

export const TodoContext = createContext<Context>({
  todos: [],
  setTodos: () => { },
  status: Status.All,
  setStatus: () => { },
  isTodosCompleted: false,
  addTodo: () => { },
  deleteTodo: () => { },
  deleteCompletedTodos: () => { },
  updateTodo: () => { },
  changeTodosStatus: () => { },
});

export const TodoProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(TODO_KEY, []);
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

  const updateTodo = (
    todoId: string,
    fieldToUpdate: string,
    newValue: unknown,
  ) => {
    setTodos(currentTodos => currentTodos
      .map(todo => (todo.id === todoId
        ? { ...todo, [fieldToUpdate]: newValue }
        : todo
      )));
  };

  const changeTodosStatus = () => {
    setTodos(currentTodos => currentTodos.map(todo => (
      { ...todo, completed: !isTodosCompleted }
    )));
  };

  const value = useMemo(() => {
    return {
      todos,
      setTodos,
      status,
      addTodo,
      deleteTodo,
      deleteCompletedTodos,
      updateTodo,
      changeTodosStatus,
      setStatus,
      isTodosCompleted,
    };
  }, [todos, status, isTodosCompleted]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
