/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable padding-line-between-statements */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { TodoType } from '../types/TodoType';
import { FilterStatus } from '../types/FilterStatus';

interface TodosContextType {
  todos: TodoType[];
  visibleTodos: TodoType[];

  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTitleTodo: (id: number, newTitle: string) => void;

  togleAll: () => void;
  clearCompleted: () => void;

  todosIsEmpty: boolean;
  activeTodosCount: number;
  completedTodosCount: number;

  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const todosIsEmpty = todos.length === 0;

  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.ALL);

  const activeTodosCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedTodosCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: TodoType = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos((prev: TodoType[]) => [...prev, newTodo]);
  };

  const removeTodo = (id: number) => {
    return setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    );
  };

  const updateTitleTodo = (id: number, newTitle: string) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newTitle };
        }

        return todo;
      }),
    );
  };

  const togleAll = () => {
    const targetValue = activeTodosCount === 0 ? false : true;

    setTodos(prev =>
      prev.map(todo => {
        return { ...todo, completed: targetValue };
      }),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const visibleTodos: TodoType[] = useMemo(() => {
    switch (filter) {
      case FilterStatus.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterStatus.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        visibleTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTitleTodo,
        togleAll,
        clearCompleted,
        todosIsEmpty,
        activeTodosCount,
        completedTodosCount,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
