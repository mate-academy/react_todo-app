import {
  createContext,
  useReducer,
  useRef,
  useEffect,
  useMemo,
  ReactNode,
  RefObject,
  Dispatch,
} from 'react';
import { Action, todoReducer } from './todoReducer';
import { initState } from './initState';
import { filterTodos } from '../utils/filterTodos';
import { Todo } from '../types/Todo';
import { FilterOption } from '../types/FilterOption';

type TodoState = {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: FilterOption;
  hasTodos: boolean;
  activeTodosCount: number;
  completedTodosCount: number;
  allTodosCompleted: boolean;
};

export const TodoStateContext = createContext<TodoState | null>(null);
export const TodoDispatchContext = createContext<Dispatch<Action> | null>(null);
export const TodoInputRefContext =
  createContext<RefObject<HTMLInputElement> | null>(null);

interface Props {
  children: ReactNode;
}

export const TodoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(todoReducer, {}, initState);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const activeTodosCount = useMemo(
    () => filterTodos(state.todos, FilterOption.ACTIVE).length,
    [state.todos],
  );

  const completedTodosCount = state.todos.length - activeTodosCount;

  const filteredTodos = useMemo(
    () => filterTodos(state.todos, state.filter),
    [state.todos, state.filter],
  );

  const stateValue = useMemo(
    () => ({
      todos: state.todos,
      filteredTodos,
      filter: state.filter,
      hasTodos: state.todos.length > 0,
      completedTodosCount,
      activeTodosCount,
      allTodosCompleted: state.todos.length > 0 && activeTodosCount === 0,
    }),
    [
      state.todos,
      state.filter,
      filteredTodos,
      completedTodosCount,
      activeTodosCount,
    ],
  );

  return (
    <TodoStateContext.Provider value={stateValue}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoInputRefContext.Provider value={inputRef}>
          {children}
        </TodoInputRefContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};
