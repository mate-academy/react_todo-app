import { createContext, ReactNode, useMemo, RefObject } from 'react';
import { TodoErrors } from '../utils/enums/TodoErrors';
import { Todo } from '../types/Todo';
import { useTodoInput } from '../hooks/useTodoInput';
import { useTodoErrors } from '../hooks/useTodoErrors';
import { useTodos } from '../hooks/useTodos';

interface ITodosContext {
  todos: Todo[];
  error: TodoErrors | null;
  inputRef: RefObject<HTMLInputElement> | null;

  onFocus: () => void;
  fetchTodos: () => void;
  addTodo: (title: string) => Todo | void;
  deleteTodo: (todoId: string) => string | void;
  deleteCompletedTodos: () => void;
  updateTodo: (todo: Todo) => Todo | void;
  updatedAllTodo: () => void;
  showError: (err: TodoErrors) => void;
}

export const TodosContext = createContext<ITodosContext>({
  todos: [],
  error: null,
  inputRef: null,

  fetchTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  deleteCompletedTodos: () => {},
  updateTodo: () => {},
  updatedAllTodo: () => {},
  showError: () => {},
  onFocus: () => {},
});

export const TodosProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const { error, showError } = useTodoErrors();
  const { inputRef, onFocus } = useTodoInput();
  const {
    todos,
    fetchTodos,
    addTodo,
    deleteTodo,
    deleteCompletedTodos,
    updateTodo,
    updatedAllTodo,
  } = useTodos();

  const store = useMemo(
    () => ({
      todos,
      error,
      inputRef,

      fetchTodos,
      addTodo,
      deleteTodo,
      showError,
      deleteCompletedTodos,
      updateTodo,
      updatedAllTodo,
      onFocus,
    }),
    [todos, error, inputRef],
  );

  return (
    <TodosContext.Provider value={store}>{children}</TodosContext.Provider>
  );
};
