/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useMemo } from 'react';
import { Todo } from '../types/Todo';
import { Context } from '../types/TodoContext';
import { FILTERS } from '../types/filterEnum';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodosContext = createContext<Context>({
  todos: [],
  saveTodo: () => {},
  toggleStatus: () => {},
  toggleAll: () => {},
  filterField: FILTERS.ALL,
  onChangeFilter: () => {},
  onClearCompleted: () => {},
  onDeleteTodo: () => {},
  onUpdateTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>([], 'todos');
  const [filterField, setFilterField] = useState<FILTERS>(FILTERS.ALL);

  const onUpdateTodo = (
    oldTodoTitle: string,
    updateTodoTitle: string,
  ): Todo[] | void => {
    const curentTodo = todos.find(
      (todo) => todo.title === oldTodoTitle,
    ) as Todo;

    if (oldTodoTitle !== updateTodoTitle) {
      curentTodo.title = updateTodoTitle;

      setTodos((prev) => {
        return prev.map((todo) => ({
          ...todo,
          curentTodo,
        }));
      });
    }
  };

  const saveTodo = (todoTitle: string) => {
    const newTodo: Todo = {
      title: todoTitle,
      completed: false,
      id: +new Date(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleStatus = (id: number) => {
    const current = todos.find((todo) => todo.id === id) as Todo;

    current.completed = !current.completed;

    setTodos((prev) => {
      return prev.map((todo) => ({
        ...todo,
        current,
      }));
    });
  };

  const toggleAll = () => {
    const isEveryComplete = todos.every((todo) => todo.completed);

    if (isEveryComplete) {
      setTodos((prev) => prev.map((todo) => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos((prev) => prev.map((todo) => ({
        ...todo,
        completed: true,
      })));
    }
  };

  const onChangeFilter = (str: FILTERS) => {
    setFilterField(str);
  };

  const onClearCompleted = () => {
    setTodos((prev) => [...prev].filter((todo) => !todo.completed));
  };

  const onDeleteTodo = (id: number) => {
    setTodos((prev) => [...prev].filter((todo) => todo.id !== id));
  };

  const value = useMemo(
    () => ({
      todos,
      saveTodo,
      toggleStatus,
      toggleAll,
      filterField,
      onChangeFilter,
      onClearCompleted,
      onDeleteTodo,
      onUpdateTodo,
    }),
    [todos, filterField],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
