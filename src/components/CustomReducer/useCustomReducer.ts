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
  Clean = 'clear',
  Add = 'add',
  Remove = 'remove',
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
      return state.map(todo =>
        todo.id === (action.payload as number) // Assuming action.payload is a number
          ? { ...todo, completed: !!todo.completed } // Toggle the completed status
          : todo,
      );
    case Filtering.Remove:
      return state.filter(elem => {
        return elem.id !== action.payload;
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

  // Return state and filterItems function
  return { state, filterItems, addTodo, addCompleted, remove };
};
