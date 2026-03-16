import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/todo';
import { todosService } from '../services/todosService';
import {
  TODO_FILTER_STATUS,
  TodoFilterStatus,
} from '../types/TodoFilterStatus';

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (todoId: number, data: Partial<Omit<Todo, 'id'>>) => void;
  removeTodo: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  filterStatus: TodoFilterStatus;
  setFilterStatus: (filter: TodoFilterStatus) => void;
  newTitleFieldRef: React.RefObject<HTMLInputElement>;
  errorMessage: string | null;
  setErrorMessage: (message: string | null) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  removeTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  filterStatus: TODO_FILTER_STATUS.ALL,
  setFilterStatus: () => {},
  newTitleFieldRef: { current: null },
  errorMessage: null,
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosService.getTodos();
  });
  const [filterStatus, setFilterStatus] = useState<TodoFilterStatus>(
    TODO_FILTER_STATUS.ALL,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const newTitleFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    todosService.setTodos(todos);
  }, [todos]);

  useEffect(() => {
    newTitleFieldRef.current?.focus();
  }, [todos, filterStatus]);

  const addTodo = (title: string) => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setErrorMessage(null);

    setTodos(prev => {
      const maxId = prev.reduce((acc, todo) => {
        return acc > todo.id ? acc : todo.id;
      }, 0);

      return [
        ...prev,
        {
          id: maxId + 1,
          title: normalizedTitle,
          completed: false,
        },
      ];
    });
  };

  const updateTodo = (
    updatedTodoId: number,
    data: Partial<Omit<Todo, 'id'>>,
  ) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === updatedTodoId ? { ...todo, ...data } : todo,
      ),
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleAll = () => {
    const todosActive = todos.filter(todo => !todo.completed);
    const newStatus = todosActive.length > 0;

    setTodos(prev =>
      prev.map(todo => {
        return { ...todo, completed: newStatus };
      }),
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        removeTodo,
        toggleAll,
        clearCompleted,
        filterStatus,
        setFilterStatus,
        newTitleFieldRef,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
