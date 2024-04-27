import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

enum FilerType {
  FILTER_TODO_ALL = 'all',
  FILTER_TODO_ACTIVE = 'active',
  FILTER_TODO_COMPLETED = 'completed',
}

type TodosContextType = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  toggleAll: () => void;
  addTodo: (newTodo: Todo) => void;
  isAllTodoCompleted: boolean;
  updateTodo: (newTodo: Todo) => void;
  deleteTodo: (deletedTodo: Todo) => void;
  clearCompleted: () => void;
  filterField: FilerType;
  setFilterField: React.Dispatch<React.SetStateAction<FilerType>>;
  visibleTodos: Todo[];
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  toggleAll: () => {},
  addTodo: () => {},
  isAllTodoCompleted: false,
  updateTodo: () => {},
  deleteTodo: () => {},
  clearCompleted: () => {},
  filterField: FilerType.FILTER_TODO_ALL,
  setFilterField: () => {},
  visibleTodos: [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterField, setFilterField] = useState(FilerType.FILTER_TODO_ALL);

  const addTodo = useCallback(
    (newTodo: Todo) => {
      setTodos([...todos, newTodo]);
    },
    [setTodos, todos],
  );

  const updateTodo = useCallback(
    (newTodo: Todo) => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todo => todo.id === newTodo.id);

      newTodos.splice(index, 1, newTodo);

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const deleteTodo = useCallback(
    (deletedTodo: Todo) => {
      const newTodos = todos.filter(todo => todo.id !== deletedTodo.id);

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  const clearCompleted = useCallback(() => {
    const deleteTodos = todos.filter(todo => todo.completed !== true);

    setTodos(deleteTodos);
  }, [setTodos, todos]);

  const toggleAll = useCallback(() => {
    const newTodos = [...todos];

    const result = newTodos.every(todo => todo.completed);

    if (result) {
      const changeTodos = newTodos.map(todo => {
        return { ...todo, completed: !todo.completed };
      });

      setTodos(changeTodos);
    } else {
      const changeTodos = newTodos.map(todo => {
        if (todo.completed === false) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });

      setTodos(changeTodos);
    }
  }, [setTodos, todos]);

  const isAllTodoCompleted = todos.every(todo => todo.completed);

  function getPrepareTodos(filter: FilerType, todos1: Todo[]) {
    const prepearedTodos = [...todos1];

    if (filter) {
      const result = prepearedTodos.filter(todo => {
        switch (filter) {
          case FilerType.FILTER_TODO_ALL:
            return todo;
          case FilerType.FILTER_TODO_ACTIVE:
            return todo.completed === true;
          case FilerType.FILTER_TODO_COMPLETED:
            return todo.completed !== true;
          default:
            return todo;
        }
      });

      return result;
    } else {
      return todos;
    }
  }

  const visibleTodos = getPrepareTodos(filterField, todos);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      toggleAll,
      addTodo,
      isAllTodoCompleted,
      updateTodo,
      deleteTodo,
      clearCompleted,
      filterField,
      setFilterField,
      visibleTodos,
    }),
    [
      addTodo,
      clearCompleted,
      deleteTodo,
      filterField,
      isAllTodoCompleted,
      setTodos,
      todos,
      toggleAll,
      updateTodo,
      visibleTodos,
    ],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
