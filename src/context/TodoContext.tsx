import { createContext, useCallback, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FilterStatus } from '../types/FilterStatus';

type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateCompleted: (todoId: number) => void;
  deleteTodo: (todoID: number) => void;
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  visibleTodos: Todo[];
  clearCompleted: () => void;
  onToggleAll: () => void;
  focusHeaderInput: () => void;
  registerFocusHandler: (fn: () => void) => void;
  renameTodo: (todoId: number, newTitle: string) => void;
};

export const TodosContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  updateCompleted: () => {},
  deleteTodo: () => {},
  filter: FilterStatus.all,
  setFilter: () => {},
  visibleTodos: [],
  clearCompleted: () => {},
  onToggleAll: () => {},
  focusHeaderInput: () => {},
  registerFocusHandler: () => {},
  renameTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.all);
  const [focusHandler, setFocusHandler] = useState<() => void>(() => () => {});

  function getFilteredTodos(currentTodos: Todo[], currentFilter: FilterStatus) {
    const filteredTodos = [...currentTodos];

    switch (currentFilter) {
      case FilterStatus.active:
        return filteredTodos.filter(todo => !todo.completed);

      case FilterStatus.completed:
        return filteredTodos.filter(todo => todo.completed);

      case FilterStatus.all:
        return filteredTodos;

      default:
        return [];
    }
  }

  const visibleTodos = getFilteredTodos(todos, filter);

  const registerFocusHandler = useCallback((fn: () => void) => {
    setFocusHandler(() => fn);
  }, []);

  const focusHeaderInput = useCallback(() => {
    focusHandler?.();
  }, [focusHandler]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      addTodo: (todo: Todo) => {
        setTodos([...todos, todo]);
      },
      updateCompleted: (todoId: number) => {
        setTodos(
          todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
          ),
        );
      },
      deleteTodo: (todoId: number) => {
        setTodos(todos.filter(todo => todo.id !== todoId));
      },
      filter,
      setFilter,
      visibleTodos,
      clearCompleted: () => {
        setTodos(todos.filter(todo => !todo.completed));
      },
      onToggleAll: () => {
        const areAllCompleted = todos.every(todo => todo.completed);

        if (!areAllCompleted) {
          setTodos(
            todos.map(todo =>
              !todo.completed ? { ...todo, completed: !todo.completed } : todo,
            ),
          );
        } else {
          setTodos(todos.map(todo => ({ ...todo, completed: false })));
        }
      },
      registerFocusHandler,
      focusHeaderInput,
      renameTodo: (todoId: number, newTitle: string) => {
        setTodos(
          todos.map(todo =>
            todo.id === todoId ? { ...todo, title: newTitle } : todo,
          ),
        );
      },
    }),
    [
      todos,
      setTodos,
      filter,
      visibleTodos,
      registerFocusHandler,
      focusHeaderInput,
    ],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
