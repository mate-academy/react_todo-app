import { useReducer } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export enum Filtering {
  All = 'all',
  Active = 'active',
  Complete = 'complete',
  ClearCompleted = 'clearCompleted',
  Add = 'add',
  Remove = 'remove',
  AllCompleted = 'allCompleted',
  AddComplete = 'addComplete',
  ChengeInput = 'changeInput',
}

export interface Action {
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
    case Filtering.ChengeInput:
      return state.map(todo => {
        if (todo.id === (action.payload as Todo).id) {
          return { ...todo, title: (action.payload as Todo).title };
        }

        return todo;
      });
    default:
      return state;
  }
};

export const useCustomReducer = () => {
  const todos = () => {
    const Data = localStorage.getItem('todos');

    if (Data !== null) {
      return JSON.parse(Data as string);
    }

    return [];
  };

  const [state, dispatch] = useReducer(reducer, todos());

  const filterItems = (filterType: Filtering) => {
    switch (filterType) {
      case Filtering.All:
        return state;
      case Filtering.Active:
        return state.filter(todo => !todo.completed);
      case Filtering.Complete:
        return state.filter(todo => todo.completed);
      default:
        return state;
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

  const changeInput = (todo: Todo) => {
    dispatch({ type: Filtering.ChengeInput, payload: todo });
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
    changeInput,
    dispatch,
  };
};
