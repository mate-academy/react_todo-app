import React, {
  useReducer,
  createContext,
  useMemo,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { todoReducer } from './TodoReducer';
import { State, TodoContextType } from './TodoContextTypes';
import { todoActions } from './TodoActions';
import { useTodoStorage } from './UseTodoStorage';
import { Todo } from '../entities/Todo';

const initialState: State = {
  todos: [],
  filter: 'all',
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [focusTrigger, setFocusTrigger] = useState(0);

  const focusAddInput = useCallback(() => {
    setFocusTrigger(prev => prev + 1);
  }, []);

  const [state, dispatch] = useReducer(todoReducer, initialState);
  const actions = useMemo(() => todoActions(dispatch), [dispatch]);

  const loadTodos = useCallback(
    (todosFromLS: Todo[]) => {
      actions.loadTodos(todosFromLS);
    },
    [actions],
  );

  useTodoStorage(state.todos, loadTodos);

  useEffect(() => {
    focusAddInput();
  }, [focusAddInput, state.todos]);

  const contextValue: TodoContextType = {
    state,
    dispatch,
    ...actions,
    focusAddInput,
    focusTrigger,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
