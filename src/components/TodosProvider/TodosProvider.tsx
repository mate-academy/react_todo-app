import { createContext, useMemo } from 'react';

import { ActionType, Todo } from '../../types';
import { useLocalStorageReducer } from '../../hooks';

type TodosContextValue = {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
};

export const TodosContext = createContext<TodosContextValue>({
  todos: [],
  dispatch: () => {},
});

type Action = { type: ActionType.Add, payload: string }
| { type: ActionType.Remove, payload: number }
| { type: ActionType.Edit, payload: { id: number, title: string } }
| { type: ActionType.Toggle, payload: number }
| { type: ActionType.ToggleAll }
| { type: ActionType.ClearCompleted };

function todosReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case ActionType.Add: {
      const newTodo: Todo = {
        id: +new Date(),
        title: action.payload,
        completed: false,
      };

      return [...state, newTodo];
    }

    case ActionType.Edit: {
      const index = state.findIndex(({ id }) => id === action.payload.id);
      const oldTodo = state[index];
      const newTodo = {
        ...oldTodo,
        title: action.payload.title,
      };

      return [
        ...state.slice(0, index),
        newTodo,
        ...state.slice(index + 1),
      ];
    }

    case ActionType.Remove: {
      return state.filter(({ id }) => id !== action.payload);
    }

    case ActionType.Toggle: {
      const index = state.findIndex(({ id }) => id === action.payload);
      const oldTodo = state[index];
      const newTodo = {
        ...oldTodo,
        completed: !oldTodo.completed,
      };

      return [
        ...state.slice(0, index),
        newTodo,
        ...state.slice(index + 1),
      ];
    }

    case ActionType.ToggleAll: {
      const hasActive = state.some(({ completed }) => !completed);

      return state.map(todo => {
        if (hasActive) {
          return todo.completed
            ? todo
            : {
              ...todo,
              completed: true,
            };
        }

        return {
          ...todo,
          completed: false,
        };
      });
    }

    case ActionType.ClearCompleted: {
      return state.filter(({ completed }) => !completed);
    }

    default:
      throw new Error('Unsupported action.');
  }
}

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorageReducer('todos', todosReducer, []);

  const contextValue = useMemo(() => ({
    todos,
    dispatch,
  }), [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
