import React, { useEffect, useMemo, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Link } from '../types/Link';

export interface TodoContextValue {
  todos: Todo[];
  filter: Link;
  editingId: number | null;
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  selectTodo: (id: number) => void;
  clearSelectTodo: () => void;
  editTodo: (id: number, newTitle: string) => void;
  selectAllTodos: (completed: boolean) => void;
  changeFilter: (filter: Link) => void;
  startEditing: (id: number) => void;
  finishEditing: () => void;
}

interface State {
  todos: Todo[];
  filter: Link;
  editingId: number | null;
}

type Action =
  | { type: 'addTodo'; payload: { title: string } }
  | { type: 'deleteTodo'; payload: { id: number } }
  | { type: 'selectTodo'; payload: { id: number } }
  | { type: 'clearSelectTodo' }
  | { type: 'editTodo'; payload: { id: number; newTitle: string } }
  | { type: 'selectAllTodos'; payload: { completed: boolean } }
  | { type: 'changeFilter'; payload: { newfilter: Link } }
  | { type: 'startEditing'; payload: { id: number } }
  | { type: 'finishEditing' };

function reducer(
  state: { todos: Todo[]; filter: Link; editingId: number | null },
  action: Action,
): State {
  switch (action.type) {
    case 'addTodo':
      const newTodo: Todo = {
        id: new Date().getTime(),
        title: action.payload.title,
        completed: false,
      };

      return {
        todos: [newTodo, ...state.todos],
        filter: state.filter,
        editingId: state.editingId,
      };
    case 'deleteTodo':
      const deleteTodo = state.todos.filter(
        todo => todo.id !== action.payload.id,
      );

      return {
        todos: deleteTodo,
        filter: state.filter,
        editingId: state.editingId,
      };

    case 'clearSelectTodo':
      const clearCompletedTodo = state.todos.filter(todo => !todo.completed);

      return {
        todos: clearCompletedTodo,
        filter: state.filter,
        editingId: state.editingId,
      };

    case 'selectTodo':
      const toggleTodo = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

      return {
        todos: toggleTodo,
        filter: state.filter,
        editingId: state.editingId,
      };

    case 'editTodo':
      const editTodo = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.newTitle }
          : todo,
      );

      return {
        todos: editTodo,
        filter: state.filter,
        editingId: state.editingId,
      };

    case 'selectAllTodos':
      const toggleAllTodos = state.todos.map(todo => ({
        ...todo,
        completed: action.payload.completed,
      }));

      return {
        todos: toggleAllTodos,
        filter: state.filter,
        editingId: state.editingId,
      };

    case 'changeFilter':
      return {
        todos: state.todos,
        filter: action.payload.newfilter,
        editingId: state.editingId,
      };

    case 'startEditing':
      return {
        todos: state.todos,
        filter: state.filter,
        editingId: action.payload.id,
      };

    case 'finishEditing':
      return {
        todos: state.todos,
        filter: state.filter,
        editingId: null,
      };

    default:
      return state;
  }
}

function getTodosLocalStorage() {
  const todos = localStorage.getItem('todos');

  return todos ? JSON.parse(todos) : [];
}

export const TodoContext = React.createContext<TodoContextValue | undefined>(
  undefined,
);

const initialState: State = {
  todos: getTodosLocalStorage(),
  filter: 'All',
  editingId: null,
};

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { todos, filter, editingId } = state;

  const addTodo = (title: string) =>
    dispatch({ type: 'addTodo', payload: { title } });

  const deleteTodo = (id: number) =>
    dispatch({ type: 'deleteTodo', payload: { id } });

  const clearSelectTodo = () => {
    dispatch({ type: 'clearSelectTodo' });
  };

  const selectTodo = (id: number) =>
    dispatch({ type: 'selectTodo', payload: { id } });

  const editTodo = (id: number, newTitle: string) =>
    dispatch({ type: 'editTodo', payload: { id, newTitle } });

  const selectAllTodos = (completed: boolean) =>
    dispatch({ type: 'selectAllTodos', payload: { completed } });

  const changeFilter = (newfilter: Link) =>
    dispatch({ type: 'changeFilter', payload: { newfilter } });

  const startEditing = (id: number) =>
    dispatch({ type: 'startEditing', payload: { id } });

  const finishEditing = () => dispatch({ type: 'finishEditing' });

  const value: TodoContextValue = useMemo(
    () => ({
      todos,
      filter,
      editingId,
      addTodo,
      deleteTodo,
      clearSelectTodo,
      selectTodo,
      editTodo,
      selectAllTodos,
      changeFilter,
      startEditing,
      finishEditing,
    }),
    [todos, filter, editingId],
  );

  useEffect(() => {
    const newTodos = JSON.stringify(todos);

    localStorage.setItem('todos', newTodos);
  }, [todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
