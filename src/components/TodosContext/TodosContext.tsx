import React, { useState } from 'react';
import { Status, Todo, TodosContextType } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode;
};

const initialTodos: Todo[] = [];

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  addTodo: () => { },
  toggleTodo: () => { },
  toggleAllTodos: () => { },
  deleteTodo: () => { },
  clearCompletedTodos: () => { },
  editTodoTitle: () => { },
  filterStatus: Status.All,
  setFilterStatus: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', initialTodos);
  const [filterStatus, setFilterStatus] = useState(Status.All);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          completed: !currentTodo.completed,
        };
      }

      return currentTodo;
    }));
  };

  const toggleAllTodos = () => {
    const markAllAsCompleted = todos.map(todo => ({
      ...todo,
      completed: true,
    }));

    const markAllAsNotCompleted = todos.map(todo => ({
      ...todo,
      completed: false,
    }));

    if (todos.every(todo => todo.completed)) {
      return setTodos(markAllAsNotCompleted);
    }

    return setTodos(markAllAsCompleted);
  };

  const deleteTodo = (id: number) => {
    return setTodos(todos.filter(currentTodo => currentTodo.id !== id));
  };

  const clearCompletedTodos = () => {
    return setTodos(todos.filter(todo => !todo.completed));
  };

  const editTodoTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          title: newTitle,
        };
      }

      return currentTodo;
    }));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        toggleAllTodos,
        deleteTodo,
        clearCompletedTodos,
        editTodoTitle,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
