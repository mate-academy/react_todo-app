import React from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface Action {
  type: 'add'
  | 'delete'
  | 'toggle'
  | 'updateAll'
  | 'showAll'
  | 'filterActive'
  | 'filterCompleted';
  payload?: Todo | Todo[];
}

export function reducer(state: Todo[], action: Action): Todo[] {
  const { type, payload } = action;

  switch (type) {
    case 'add': {
      if (payload) {
        return [...state, payload as Todo];
      }

      return state;
    }

    case 'delete': {
      if (payload && !Array.isArray(payload)) {
        return state.filter((todo) => todo.id !== payload.id);
      }

      return state;
    }

    case 'toggle': {
      if (payload && !Array.isArray(payload)) {
        return state.map((todo) => {
          if (todo.id === payload.id) {
            return { ...todo, completed: !todo.completed };
          }

          return todo;
        });
      }

      return state;
    }

    case 'updateAll': {
      if (payload && Array.isArray(payload)) {
        return payload;
      }

      return state;
    }

    case 'showAll': {
      return state;
    }

    case 'filterActive': {
      return state.filter((todo) => !todo.completed);
    }

    case 'filterCompleted': {
      return state.filter((todo) => todo.completed);
    }

    default:
      return state;
  }
}

export const TodosContext = React.createContext<Todo[] | undefined>(undefined);
