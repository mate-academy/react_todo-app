import React, {
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';
import { changeStatus } from '../utils/ChangeStatus';
import { toggleAll } from '../utils/ToggleAll';
import { Status } from '../types/Filter';
import { State } from '../types/ContextState';
import { editTodo } from '../utils/EditTodo';
import { useLocalStorage } from '../hooks/useLocalStorage';

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add_todo':
      return [...todos, action.payload];
    case 'remove_todo':
      return todos.filter((todo) => todo.id !== action.payload);
    case 'change_status':
      return changeStatus(todos, action.payload);
    case 'toggle_all':
      return toggleAll(todos);
    case 'remove_all_completed':
      return todos.filter((todo) => !todo.completed);
    case 'edit_todo':
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
