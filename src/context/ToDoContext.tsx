import React, { ReactNode, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/LocalStorage';

type ContextProps = {
  todos: Todo[];
  status: Status,
  setStatus: (status: Status) => void;
  setTodos: (todos: Todo[]) => void;
  addTodo: (newItem: Todo) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTitle: (todoId: number, value: string) => void;
  handleClearCompleted: () => void;
  toggleAll: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  status: Status.All,
  setStatus: () => {},
  setTodos: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  changeTitle: () => {},
  handleClearCompleted: () => {},
  toggleAll: () => {},
});

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('id', []);
  const [status, setStatus] = useState<Status>(Status.All);

  const addTodo = (newItem: Todo): void => {
    setTodos([...todos, newItem]);
  };

  const toggleTodo = (todoId: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const changeTitle = (todoId: number, value: string) => {
    const changedTodo = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: value,
        };
      }

      return todo;
    });

    setTodos(changedTodo);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const allCompleted = (): boolean => {
    return todos.every(todo => todo.completed);
  };

  const toggleAll = () => {
    if (allCompleted()) {
      const updatedTodos = todos.map(item => ({ ...item, completed: false }));

      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.map(item => ({ ...item, completed: true }));

      setTodos(updatedTodos);
    }
  };

  return (
    <TodosContext.Provider value={{
      todos,
      status,
      setStatus,
      setTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      changeTitle,
      handleClearCompleted,
      toggleAll,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
