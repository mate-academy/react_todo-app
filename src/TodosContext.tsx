import React, { useMemo, useState, PropsWithChildren } from 'react';
import { Todo, Status, Context } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

export const TodosContext = React.createContext({} as Context);
const storageKey = 'todos';

export const TodosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [allTodos, setAllTodos] = useLocalStorage<Todo[]>(storageKey, []);
  const [todoEditId, setTodoEditId] = useState<number | null>(null);
  const [status, setStatus] = useState(Status.All);

  const visibleTodos = useMemo(() => {
    if (status === Status.All) {
      return allTodos;
    }

    return allTodos.filter(todo => {
      switch (status) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [allTodos, status]);

  const addTodo = (todo: Todo) => {
    setAllTodos(prevTodos => [...prevTodos, todo]);
  };

  const deleteTodo = (todoId: number) => {
    setAllTodos(prevTodos => prevTodos.filter(
      ({ id }) => id !== todoId,
    ));
  };

  const toggleTodoStatus = (todoId: number) => {
    setAllTodos(prevTodos => prevTodos.map(
      todo => (todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const editTodoTitle = (todoId: number, newTitle: string) => {
    setAllTodos(prevTodos => prevTodos.map(
      todo => (todo.id === todoId
        ? { ...todo, title: newTitle }
        : todo),
    ));
  };

  const incompletedCount = useMemo(() => {
    return allTodos.filter(({ completed }) => !completed).length;
  }, [allTodos]);

  const hasTodos = useMemo(() => {
    return allTodos.length > 0;
  }, [allTodos]);

  const isEveryCompleted = useMemo(() => {
    return allTodos.every(todo => todo.completed);
  }, [allTodos]);

  const isAnyCompleted = useMemo(() => {
    return allTodos.some(todo => todo.completed);
  }, [allTodos]);

  const toggleAllTodosStatus = () => {
    setAllTodos(prevTodos => prevTodos.map(todo => ({
      ...todo,
      completed: !isEveryCompleted,
    })));
  };

  const removeCompleted = () => {
    setAllTodos(prevTodos => prevTodos.filter(
      todo => !todo.completed,
    ));
  };

  const value: Context = useMemo(() => ({
    visibleTodos,
    status,
    setStatus,
    addTodo,
    deleteTodo,
    toggleTodoStatus,
    editTodoTitle,
    incompletedCount,
    hasTodos,
    isEveryCompleted,
    isAnyCompleted,
    toggleAllTodosStatus,
    removeCompleted,
    todoEditId,
    setTodoEditId,
  }), [allTodos, todoEditId, status]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
