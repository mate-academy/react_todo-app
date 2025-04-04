import React, { useContext, useMemo, useState } from 'react';
import { FilterBy, Todo } from '../types/Types';
import { useLocalStorage } from './LocalStorage';

export type State = {
  todos: Todo[];
  visibleTodos: Todo[];
  filterBy: FilterBy;
  activeTodosCount: number;
  hasSomeCompleted: boolean;
  hasAllCompleted: boolean;

  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  deleteCompletedTodos: () => void;
  renameTodo: (id: number, title: string) => void;
  toggleTodo: (id: number) => void;
  toggleAllTodo: () => void;
  setFilterBy: (filter: FilterBy) => void;
};

const initialState: State = {
  todos: [],
  visibleTodos: [],
  filterBy: FilterBy.All,
  activeTodosCount: 0,
  hasSomeCompleted: false,
  hasAllCompleted: false,

  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  deleteCompletedTodos: () => {},
  renameTodo: () => {},
  toggleTodo: () => {},
  toggleAllTodo: () => {},
  setFilterBy: () => {},
};

function filterTodo(todos: Todo[], filterBy: FilterBy): Todo[] {
  switch (filterBy) {
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return [...todos];
  }
}

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const state = useContext(StateContext);
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasSomeCompleted = todos.some(todo => todo.completed);
  const hasAllCompleted =
    activeTodosCount === 0 || todos.every(todo => todo.completed);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title: title,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) =>
    setTodos(todos.filter(todo => todo.id !== id));

  const deleteCompletedTodos = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const renameTodo = (id: number, newTitle: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo,
    );

    setTodos(updatedTodos);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const toggleAllTodo = () => {
    const completeAll = !hasAllCompleted;

    const updatedTodos = todos.map(todo =>
      todo.completed !== completeAll
        ? { ...todo, completed: completeAll }
        : todo,
    );

    setTodos(updatedTodos);
  };

  const visibleTodos = useMemo(
    () => filterTodo(todos, filterBy),
    [todos, filterBy],
  );

  const stateValue = {
    ...state,
    todos,
    setTodos,
    filterBy,
    setFilterBy,
    visibleTodos,
    activeTodosCount,
    hasSomeCompleted,
    hasAllCompleted,
    addTodo,
    deleteTodo,
    deleteCompletedTodos,
    renameTodo,
    toggleTodo,
    toggleAllTodo,
  };

  return (
    <StateContext.Provider value={stateValue}>{children}</StateContext.Provider>
  );
};
