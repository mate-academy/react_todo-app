import {
  FC,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Todo } from '../types/types';

export interface TodoContextType {
  todos: Todo[];
  allCompleted: boolean;
  numberNotComplete: number;
  numberComplete: number;

  setTodos: (todos: Todo[]) => void;
  addTodo: (newTodo: string) => void;
  toggleTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  editTask: (id: string, newName: string) => void;
  toggleAll: () => void;
  deleteCompletedTodos: () => void;

  getAllTodos: () => void;
  getActiveTodos: () => void;
  getCompletedTodos: () => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  allCompleted: false,
  numberNotComplete: 0,
  numberComplete: 0,

  setTodos: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTask: () => {},
  toggleAll: () => {},
  deleteCompletedTodos: () => {},

  getAllTodos: () => {},
  getActiveTodos: () => {},
  getCompletedTodos: () => {},
});

type TProps = {
  children: React.ReactNode;
};

export const TodoProvider: FC<TProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem('todos');

    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // #region constant
  const allCompleted = todos.every(todo => todo.completed);
  const numberNotComplete = todos.filter(todo => !todo.completed).length;
  const numberComplete = todos.filter(todo => todo.completed).length;
  // #endregion

  const addTodo = (newTodo: string) => {
    if (newTodo.trim() !== '') {
      setTodos(currentTodos => [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newTodo, completed: false },
      ]);
    }
  };

  const toggleTodo = (id: string, completed: boolean) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  };

  const deleteTodo = (id: string) => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  };

  const editTask = (id: string, newName: string) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newName };
        }

        return todo;
      });
    });
  };

  const deleteCompletedTodos = useCallback(() => {
    const deleteTodos = todos.filter(todo => !todo.completed);

    setTodos(deleteTodos);
  }, [todos]);

  const toggleAll = useCallback(() => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  }, [todos, allCompleted]);

  const getAllTodos = useCallback(() => {
    return todos;
  }, [todos]);

  const getActiveTodos = useCallback(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const getCompletedTodos = useCallback(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      allCompleted,
      numberNotComplete,
      numberComplete,
      setTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTask,
      toggleAll,
      deleteCompletedTodos,
      getAllTodos,
      getActiveTodos,
      getCompletedTodos,
    }),
    [
      todos,
      allCompleted,
      numberNotComplete,
      numberComplete,
      toggleAll,
      deleteCompletedTodos,
      getAllTodos,
      getActiveTodos,
      getCompletedTodos,
    ],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
