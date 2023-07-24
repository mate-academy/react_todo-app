import React, { useMemo, useState } from 'react';
import { Todo, Status, Context } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

export const TodosContext = React.createContext({} as Context);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [allTodos, setAllTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoEditId, setTodoEditId] = useState<number | null>(null);
  const [status, setStatus] = useState(Status.All);

  const visibleTodos = allTodos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const addTodo = (todo: Todo) => {
    setAllTodos(prevTodos => [...prevTodos, todo]);
  };

  const deleteTodo = (todoId: number) => {
    setAllTodos(prevTodos => prevTodos.filter(
      ({ id }) => id !== todoId,
    ));
  };

  const toggleCompletedTodo = (todoId: number) => {
    setAllTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed: !todo.completed };
    }));
  };

  const editTodo = (todoId: number, newTitle: string) => {
    setAllTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title: newTitle };
    }));
  };

  const incompletedCount = allTodos.reduce((count, todo) => {
    return todo.completed
      ? count
      : count + 1;
  }, 0);

  const areTodos = allTodos.length > 0;
  const areAllCompleted = allTodos.every(todo => todo.completed);
  const areSomeCompleted = allTodos.some(todo => todo.completed);

  const toggleAllTodosStatus = () => {
    if (!areAllCompleted) {
      setAllTodos(prevTodos => prevTodos.map(todo => ({
        ...todo,
        completed: true,
      })));

      return;
    }

    setAllTodos(prevTodos => prevTodos.map(todo => ({
      ...todo,
      completed: false,
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
    toggleCompletedTodo,
    editTodo,
    incompletedCount,
    areTodos,
    areAllCompleted,
    areSomeCompleted,
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
