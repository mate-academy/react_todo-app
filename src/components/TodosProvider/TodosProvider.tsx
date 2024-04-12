import {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = PropsWithChildren;

interface AddAction {
  type: 'add';
  payload: {
    title: string;
  };
}

interface UpdateAction {
  type: 'update';
  payload: {
    id: number;
    title?: string;
    completed?: boolean;
  };
}

interface DeleteAction {
  type: 'delete';
  payload: {
    id: number;
  };
}

interface DeleteCompletedAtion {
  type: 'deleteCompleted';
}

interface ToggleAction {
  type: 'toggle';
  payload: {
    id: number;
  };
}

interface ToggleAllAction {
  type: 'setAll';
  payload: {
    completed: boolean;
  };
}

type Action =
  | AddAction
  | UpdateAction
  | DeleteAction
  | DeleteCompletedAtion
  | ToggleAction
  | ToggleAllAction;

let lastId = 0;

function getInitialTodos(key: string): Todo[] {
  const todosString = localStorage.getItem(key);

  if (!todosString) {
    return [];
  }

  return JSON.parse(todosString);
}

function todosReducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [
        ...todos,
        {
          id: ++lastId,
          title: action.payload.title,
          completed: false,
        },
      ];
    case 'update':
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            ...action.payload,
          };
        }

        return todo;
      });

    case 'toggle':
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });
    case 'setAll':
      return todos.map(todo => ({
        ...todo,
        ...action.payload,
      }));
    case 'delete':
      return todos.filter(todo => todo.id !== action.payload.id);
    case 'deleteCompleted':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
}

export type ShowMode = 'all' | 'completed' | 'active';

interface Context {
  todos: Todo[];
  displayedTodos: Todo[];
  dispatch: (action: Action) => void;
  showMode: ShowMode;
  setShowMode: (showMode: ShowMode) => void;
}

export const TodosContext = React.createContext<Context>({
  todos: [],
  displayedTodos: [],
  dispatch: () => {},
  showMode: 'all',
  setShowMode: () => {},
});

export const TodosProvider: FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, 'todos', getInitialTodos);
  const [showMode, setShowMode] = useState<ShowMode>('all');

  const displayedTodos = useMemo(() => {
    let result: Todo[];

    switch (showMode) {
      case 'active':
        result = todos.filter(t => !t.completed);
        break;
      case 'completed':
        result = todos.filter(t => t.completed);
        break;
      case 'all':
      default:
        result = todos;
    }

    return result;
  }, [todos, showMode]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = {
    todos,
    displayedTodos,
    showMode,
    setShowMode,
    dispatch,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
