import { useReducer } from 'react';

// Define Todo interface
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Define filtering options enum
export enum Filtering {
  All = 'all',
  Active = 'active',
  Complete = 'complete',
  ClearCompleted = 'clearCompleted',
  Add = 'add',
  Remove = 'remove',
  AllCompleted = 'allCompleted',
  AddComplete = 'addComplete',
}

// Define action interface
interface Action {
  type: Filtering;
  payload?: number | Todo;
}

const reducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case Filtering.Add:
      return [...state, action.payload as Todo];
    case Filtering.AddComplete:
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
    case Filtering.Remove:
      return state.filter(elem => {
        return elem.id !== action.payload;
      });
    case Filtering.ClearCompleted:
      return state.filter(todo => !todo.completed);
    case Filtering.AllCompleted:
      if (state.some(todo => !todo.completed)) {
        return state.map(todo => {
          return { ...todo, completed: true };
        });
      }

      return state.map(todo => {
        return { ...todo, completed: false };
      });
    default:
      return state;
  }
};

// Define your useCustomReducer hook
export const useCustomReducer = () => {
  // Initializing state using useReducer hook with the reducer function
  const [state, dispatch] = useReducer(reducer, []);

  // Define filterItems function to filter todos based on filterType
  const filterItems = (filterType: Filtering) => {
    switch (filterType) {
      case Filtering.All:
        return state; // Return the entire state array
      case Filtering.Active:
        return state.filter(todo => !todo.completed); // Filter active todos
      case Filtering.Complete:
        return state.filter(todo => todo.completed); // Filter completed todos
      default:
        return state; // Default case: return the entire state array
    }
  };

  const addTodo = (todo: Todo) => {
    dispatch({ type: Filtering.Add, payload: todo });
  };

  const addCompleted = (id: number) => {
    dispatch({ type: Filtering.AddComplete, payload: id });
  };

  const remove = (id: number) => {
    dispatch({ type: Filtering.Remove, payload: id });
  };

  const clearCompleted = () => {
    dispatch({ type: Filtering.ClearCompleted });
  };

  const allCompleted = () => {
    dispatch({ type: Filtering.AllCompleted });
  };

  // Return state and filterItems function
  return {
    state,
    filterItems,
    addTodo,
    addCompleted,
    remove,
    clearCompleted,
    allCompleted,
  };
};
