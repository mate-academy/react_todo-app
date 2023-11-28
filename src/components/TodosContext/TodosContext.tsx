import React from 'react';
import { Todo } from '../../types/Todo';
import { Action, ActionType } from '../../types/Action';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case ActionType.AddTodo:
      if (!action.payload) {
        return state;
      }

      return [...state, action.payload];

    case ActionType.DeleteTodo:
      return state.filter(({ id }) => id !== action.payload);

    case ActionType.DeleteComplited:
      return state.filter(({ completed }) => !completed);

    case ActionType.ChangeCompleted:
      return state.map(item => (item.id === action.payload
        ? { ...item, completed: !item.completed }
        : item));

    case ActionType.ChangeAllCompleted: {
      if (state.every(({ completed }) => completed)
        || state.every(({ completed }) => !completed)) {
        return state.map((item) => {
          return {
            ...item,
            completed: !item.completed,
          };
        });
      }

      return state.map((item) => {
        return {
          ...item,
          completed: true,
        };
      });
    }

    case ActionType.ChangeTitle:
      return state.map(item => (item.id === action.payload.id
        ? { ...item, title: action.payload.title }
        : item));

    case ActionType.SetTodos:
      return action.payload;

    default:
      return state;
  }
}

type TC = {
  todos: Todo[];
  dispatch: (o: Action) => void;
};

const DEFAULT_TODOSCONTEXT: TC = {
  todos: [],
  dispatch: () => { },
};

export const TodosContext = React.createContext<TC>(DEFAULT_TODOSCONTEXT);

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useLocalStorage<Todo[], Action>(
    'todos',
    reducer,
    [],
  );

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
