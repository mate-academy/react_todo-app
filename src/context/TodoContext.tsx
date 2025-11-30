import React, {
  useContext,
  useEffect,
  useReducer,
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { Todo } from '../types/Todo';
import { initialState, saveTodos } from '../utils/storage';
import { Filter } from '../types/Filter';

export enum ActionType {
  Add = 'add',
  Remove = 'remove',
  Toggle = 'toggle',
  SetFilter = 'setFilter',
  ToggleAll = 'toggleAll',
  ClearCompleted = 'clearCompleted',
  Edit = 'edit',
}

interface AddAction {
  type: ActionType.Add;
  payload: {
    title: string;
  };
}

interface RemoveAction {
  type: ActionType.Remove;
  payload: {
    id: number;
  };
}

interface ToggleAction {
  type: ActionType.Toggle;
  payload: {
    id: number;
  };
}

interface SetFilterAction {
  type: ActionType.SetFilter;
  payload: {
    filter: Filter;
  };
}

interface ToggleAllAction {
  type: ActionType.ToggleAll;
}

interface EditAction {
  type: ActionType.Edit;
  payload: {
    id: number;
    title: string;
  };
}

interface ClearCompletedAction {
  type: ActionType.ClearCompleted;
}

export type TodoAction =
  | AddAction
  | RemoveAction
  | ToggleAction
  | SetFilterAction
  | ToggleAllAction
  | EditAction
  | ClearCompletedAction;

export const todosReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case ActionType.Add:
      return [
        ...state,
        {
          id: +new Date(),
          title: action.payload.title,
          completed: false,
        },
      ];

    case ActionType.Remove:
      return state.filter(todo => todo.id !== action.payload.id);

    case ActionType.Toggle:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

    case ActionType.ToggleAll:
      const allCompleted = state.every(todo => todo.completed);
      const newCompletedStatus = !allCompleted;

      return state.map(todo => ({
        ...todo,
        completed: newCompletedStatus,
      }));

    case ActionType.Edit:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );

    case ActionType.ClearCompleted:
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

interface TodosContextType {
  todos: Todo[];
  filter: Filter;
  dispatch: React.Dispatch<TodoAction>;
}

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined,
);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);

  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const customDispatch = useCallback(
    (action: TodoAction) => {
      if (action.type === ActionType.SetFilter) {
        setFilter(action.payload.filter);
      } else {
        dispatch(action);
      }
    },
    [dispatch],
  );

  const contextValue: TodosContextType = useMemo(
    () => ({
      todos,
      filter,
      dispatch: customDispatch,
    }),
    [todos, filter, customDispatch],
  );

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
