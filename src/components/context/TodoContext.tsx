import React, { useEffect, useState } from 'react';
import { TodosContextType } from '../../types/TodosContext';
import { Todo } from '../../types/Todo';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : startValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export const TodosContext = React.createContext<TodosContextType | null>(null);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', [] as Todo[]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(
      (todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(
      (todo) => todo.id !== id,
    ));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <TodosContext.Provider value={{
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodoTitle,
      deleteCompletedTodos,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
