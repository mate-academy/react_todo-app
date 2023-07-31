/* eslint-disable max-len */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { TodoType } from '../types/Todo';
import { TodosMap } from '../types/TodosMap';

type ContextValue = {
  todosMap: TodosMap;
  handleClearCompleted: () => void;
  handleToggleCompleted: (id: number) => void;
  handleDeleteTodo: (id: number) => void;
  handleAddTodo: (title: string) => void;
  handleToggleCompletedAll: () => void;
  handleTitleUpdate: (id: number, value: string) => void;
};

const TodosContext = createContext<ContextValue | undefined>(undefined);

export const TodosProvider = ({ children }: React.PropsWithChildren) => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const storedValue = localStorage.getItem('todos');

    return storedValue ? JSON.parse(storedValue) : [];
  });

  useEffect(() => {
    const parsedTodos = JSON.stringify(todos);

    localStorage.setItem('todos', parsedTodos);
  }, [todos]);

  const handleAddTodo = useCallback((title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos((curState) => [...curState, newTodo]);
  }, []);

  const handleDeleteTodo = useCallback((id: number) => {
    setTodos((curState) => curState.filter((todo) => todo.id !== id));
  }, []);

  const handleToggleCompleted = useCallback((id: number) => {
    setTodos((curState) => curState.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }, []);

  const handleTitleUpdate = useCallback(
    (id: number, value: string) => setTodos((curState) => curState.map((todo) => (todo.id === id ? { ...todo, title: value } : todo))),
    [],
  );

  const todosMap: TodosMap = useMemo(
    () => todos.reduce(
      (acc, nextTodo) => {
        const todoMapKey = nextTodo.completed ? 'completed' : 'active';

        return {
          ...acc,
          [todoMapKey]: [...acc[todoMapKey], nextTodo],
        };
      },
      {
        all: todos,
        completed: [],
        active: [],
      },
    ),
    [todos],
  );

  const handleClearCompleted = useCallback(
    () => todosMap.completed.forEach((todo) => handleDeleteTodo(todo.id)),
    [todosMap],
  );

  const handleToggleCompletedAll = useCallback(() => {
    const todosToProcess
      = todosMap.active.length > 0 ? todosMap.active : todosMap.completed;

    todosToProcess.forEach((todo) => handleToggleCompleted(todo.id));
  }, [todosMap]);

  const value = useMemo(
    () => ({
      todosMap,
      handleAddTodo,
      handleToggleCompleted,
      handleDeleteTodo,
      handleClearCompleted,
      handleToggleCompletedAll,
      handleTitleUpdate,
    }),
    [todosMap],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  return context as ContextValue;
};
