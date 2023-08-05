import React, {
  createContext, useReducer, useEffect, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Status } from './TodosFilter/Status';

interface TodoContextData {
  stateTodos: Todo[],
  filter: Status;
  setFilter: (v: Status) => void;
  filterTodos: (v: Status) => Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

type TodoAction =
  { type: 'add_todo'; payload: Todo }
  | { type: 'delete_todo'; payload: number }
  | { type: 'toggle_completed'; payload: number }
  | { type: 'mark_all_completed' }
  | { type: 'edit_todo'; payload: { id: number; title: string } }
  | { type: 'set_filtered_todos'; payload: Todo[] };

const reducer = (state: Todo[], action: TodoAction) => {
  switch (action.type) {
    case 'add_todo':
      return [...state, action.payload];
    case 'delete_todo':
      return state.filter((todo) => todo.id !== action.payload);
    case 'toggle_completed':
      return state.map((todo) => (
        (todo.id === action.payload)
          ? { ...todo, completed: !todo.completed }
          : todo));
    case 'mark_all_completed':
      return state.map((todo) => ({ ...todo, completed: true }));
    case 'edit_todo':
      return state.map((todo) => (
        (todo.id === action.payload.id)
          ? { ...todo, title: action.payload.title }
          : todo
      ));
    case 'set_filtered_todos':
      return action.payload;
    default:
      return state;
  }
};

export const TodoContext = createContext<TodoContextData>({
  stateTodos: [],
  dispatch: () => { },
  filterTodos: () => [],
  filter: Status.All,
  setFilter: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [stateTodos, dispatch] = useReducer(reducer, [], () => {
    const data = localStorage.getItem('todos');

    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(stateTodos));
  }, [stateTodos]);
  const [filter, setFilter] = useState(Status.All);

  const filterTodos = (v: Status): Todo[] => {
    switch (v) {
      case Status.Completed:
        return stateTodos.filter((todo) => todo.completed);
      case Status.Active:
        return stateTodos.filter((todo) => !todo.completed);
      default:
        return stateTodos;
    }
  };

  const value = {
    stateTodos,
    dispatch,
    filterTodos,
    filter,
    setFilter,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
