import React, {
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Action, ActionTypes } from '../types/Action';
import { changeStatus } from '../utils/ChangeStatus';
import { toggleAll } from '../utils/ToggleAll';
import { Status } from '../types/Filter';
import { State } from '../types/ContextState';
import { editTodo } from '../utils/EditTodo';
import { useLocalStorage } from '../hooks/useLocalStorage';

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...todos, action.payload];
    case ActionTypes.REMOVE_TODO:
      return todos.filter((todo) => todo.id !== action.payload);
    case ActionTypes.CHANGE_STATUS:
      return changeStatus(todos, action.payload);
    case ActionTypes.TOGGLE_ALL:
      return toggleAll(todos);
    case ActionTypes.REMOVE_ALL_COMPLETED:
      return todos.filter((todo) => !todo.completed);
    case ActionTypes.EDIT_TODO:
      return editTodo(todos, action.payload);
    default:
      return todos;
  }
}

const initialState: State = {
  todos: [],
  filterBy: Status.ALL,
  setFilterBy: () => {},
  dispatch: () => {},
};

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const TodosStateProvider: React.FC<Props> = ({ children }) => {
  const [value, setValue] = useLocalStorage<Todo[]>('todos', []);
  const [todos, dispatch] = useReducer(reducer, value);
  const [filterBy, setFilterBy] = useState(Status.ALL);

  const state = useMemo(() => {
    return {
      todos,
      filterBy,
      setFilterBy,
      dispatch,
    };
  }, [todos, filterBy]);

  useEffect(() => {
    setValue(state.todos);
  }, [state.todos]);

  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
};
