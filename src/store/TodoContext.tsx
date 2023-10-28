import {
  createContext,
  Dispatch,
  useReducer,
} from 'react';
import { useLocalStorage } from '../hooks/useLocaleStorage';
import { State, Action } from '../types/Context';
import { Todo } from '../types/Todo';

type Props = {
  children: React.ReactNode,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return {
        ...state,
        todos: [...state.todos, newTask],
      };
    }

    case 'REMOVE_TASK': {
      const updatedTodos = state.todos
        .filter(todo => todo.id !== action.payload);

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'TOGGLE_ALL': {
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        completed: action.payload,
      }));

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'CHANGE_FILTER': {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case 'CLEAR_COMPLETED': {
      const updatedTodos = state.todos.filter(todo => !todo.completed);

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case 'CHANGE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    default:
      return state;
  }
};

const initialState: State = {
  todos: [],
  filter: 'ALL',
};

export const TodosContext
  = createContext<[State, Dispatch<Action>] | undefined>(undefined);

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [initialValue, save] = useLocalStorage(
    'todos', [] as Todo[],
  );

  const stateWithLocalStorage = {
    ...initialState,
    todos: initialValue,
    onSave: save,
  };

  const value = useReducer<React.Reducer<State, Action>>(
    reducer, stateWithLocalStorage,
  );

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
