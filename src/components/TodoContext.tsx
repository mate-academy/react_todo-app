/* eslint-disable no-case-declarations */
import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Todo } from '../types/Todo';
import { Status } from './TodosFilter/Status';
import { useLocalStorage } from './useLocalStarege';

interface TodoState {
  allTodos: Todo[];
  filteredTodos: Todo[];
}

interface TodoContextData {
  state: TodoState;
  filter: Status;
  setFilter: (v: Status) => void;
  getVisibleTodos: (v: Status) => Todo[];
  dispatch: React.Dispatch<TodoAction>;
  checked: boolean;
  setChecked: (v: boolean) => void;
}

type TodoAction =
  | { type: 'add_todo'; payload: Todo }
  | { type: 'delete_todo'; payload: number }
  | { type: 'delete_all_complete' }
  | { type: 'toggle_completed'; payload: number }
  | { type: 'mark_all_completed'; payload: boolean}
  | { type: 'edit_todo'; payload: { id: number; title: string } }
  | { type: 'set_visible_todos'; payload: Todo[] };

const reducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        allTodos: [...state.allTodos, action.payload],
        filteredTodos: [...state.filteredTodos, action.payload],
      };
    case 'delete_todo':
      const updatedAllTodos
        = state.allTodos.filter((todo) => todo.id !== action.payload);
      const updatedFilteredTodos
        = state.filteredTodos.filter((todo) => todo.id !== action.payload);

      return {
        ...state,
        allTodos: updatedAllTodos,
        filteredTodos: updatedFilteredTodos,
      };
    case 'delete_all_complete':
      const findAllComplete
        = state.allTodos.filter((todo) => todo.completed === false);
      const findFilteredComplete
        = state.filteredTodos.filter((todo) => todo.completed === false);

      return {
        ...state,
        allTodos: findAllComplete,
        filteredTodos: findFilteredComplete,
      };
    case 'toggle_completed':
      const toggledAllTodos
        = state.allTodos.map((todo) => (todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo));

      const toggledFilteredTodos
        = state.filteredTodos.map((todo) => (todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo));

      return {
        ...state,
        allTodos: toggledAllTodos,
        filteredTodos: toggledFilteredTodos,
      };
    case 'mark_all_completed':
      const updatedAllTodo = state.allTodos.map((todo) => ({
        ...todo,
        completed: !action.payload,
      }));

      const updatedFilteredTodo = state.filteredTodos.map((todo) => ({
        ...todo,
        completed: !action.payload,
      }));

      return {
        ...state,
        allTodos: updatedAllTodo,
        filteredTodos: updatedFilteredTodo,
      };
    case 'edit_todo':
      const editedAllTodos
        = state.allTodos.map((todo) => (todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo));
      const editedFilteredTodos
        = state.filteredTodos.map((todo) => (todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo));

      return {
        ...state,
        allTodos: editedAllTodos,
        filteredTodos: editedFilteredTodos,
      };
    case 'set_visible_todos':
      return { ...state, filteredTodos: action.payload };
    default:
      return state;
  }
};

export const TodoContext = createContext<TodoContextData>({
  state: { allTodos: [], filteredTodos: [] },
  filter: Status.All,
  setFilter: () => { },
  getVisibleTodos: () => [],
  dispatch: () => { },
  checked: false,
  setChecked: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [allTodos, setAllTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Status.All);
  const [checked, setChecked] = useState<boolean>(
    allTodos.every(todo => todo.completed) && allTodos.length > 0,
  );
  const [state, dispatch]
    = useReducer(reducer, { allTodos, filteredTodos: allTodos });

  const getVisibleTodos = (v: Status): Todo[] => {
    switch (v) {
      case Status.Completed:
        return allTodos.filter((todo) => todo.completed);
      case Status.Active:
        return allTodos.filter((todo) => !todo.completed);
      default:
        return allTodos;
    }
  };

  const setFilteredTodos = useCallback(() => {
    const filteredTodos = getVisibleTodos(filter);

    dispatch({ type: 'set_visible_todos', payload: filteredTodos });
  }, [filter]);

  useEffect(() => {
    setFilteredTodos();
  }, [setFilteredTodos]);

  useEffect(() => {
    setAllTodos(state.allTodos);
  }, [state.allTodos]);

  const value = {
    state,
    filter,
    setFilter,
    getVisibleTodos,
    dispatch,
    checked,
    setChecked,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
