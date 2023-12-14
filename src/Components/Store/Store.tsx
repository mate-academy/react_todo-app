import React, { useEffect, useReducer } from 'react';
import { Todo } from '../../types/Todo';

export enum Actions {
  markAll = 'markAll',
  addNew = 'addNew',
  mark = 'mark',
  destroy = 'destroy',
  edit = 'edit',
  destroyCompleted = 'destroyCompleted',
}

export enum Keys {
  Escape = 'Escape',
  Enter = 'Enter',
}

type Action = { type: Actions.markAll }
| { type: Actions.addNew, todo: Todo }
| { type: Actions.mark, todo: Todo }
| { type: Actions.destroy, todo: Todo }
| { type: Actions.edit, todo: Todo }
| { type: Actions.destroyCompleted };

interface State {
  allTodos: Todo[],
}

function saveTodos(updatedTodos: Todo[]) {
  return {
    allTodos: updatedTodos,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'mark': {
      const updatedTodos = state.allTodos.map((todo: Todo) => {
        return (todo.id === action.todo.id ? {
          ...todo,
          completed: !action.todo.completed,
        } : todo);
      });

      return saveTodos(updatedTodos);
    }

    case 'markAll': {
      const completedTodos = state.allTodos.filter(todo => todo.completed);

      if (state.allTodos.length === completedTodos.length) {
        const updatedTodos = state.allTodos.map((todo: Todo) => {
          return {
            ...todo,
            completed: false,
          };
        });

        return saveTodos(updatedTodos);
      }

      const updatedTodos = state.allTodos.map((todo: Todo) => {
        return {
          ...todo,
          completed: true,
        };
      });

      return saveTodos(updatedTodos);
    }

    case 'addNew': {
      const updatedTodos = [...state.allTodos, action.todo];

      return saveTodos(updatedTodos);
    }

    case 'destroyCompleted': {
      const updatedTodos = state.allTodos.filter((todo) => !todo.completed);

      return saveTodos(updatedTodos);
    }

    case 'destroy': {
      const updatedTodos = state.allTodos.filter((todo) => {
        return (action.todo.id !== todo.id);
      });

      return saveTodos(updatedTodos);
    }

    case 'edit': {
      const index = state.allTodos.findIndex(todo => {
        return todo.id === action.todo.id;
      });

      const updatedTodos = state.allTodos.map((todo, todoIndex) => {
        return (todoIndex === index ? {
          ...todo,
          title: action.todo.title,
        } : todo);
      });

      return saveTodos(updatedTodos);
    }

    default:
      return state;
  }
}

const initialState: State = {
  allTodos: [],
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => { },
);

interface Props {
  children: React.ReactNode,
}

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const storedTodos = localStorage.getItem('todos');
  const initialTodos = storedTodos !== null ? {
    allTodos: JSON.parse(storedTodos),
  } : initialState;

  const [state, dispatch] = useReducer(reducer, initialTodos);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.allTodos));
  }, [state.allTodos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
