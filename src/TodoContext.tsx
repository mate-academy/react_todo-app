import React, { useEffect, useMemo, useState } from 'react';
import { Todo, todos } from './components/todo_items/todo';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from './components/locale_storage';

interface Methods {
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
  renameTodo: (id: number, title: string) => void;
}

export const TodoContext = React.createContext({
  todo: todos,
  setTodos: (todosItem: Todo[]) => {},
});

export const MethodsContext = React.createContext<Methods>({
  handleDelete: () => {},
  handleComplete: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  renameTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todo, setTodos] = useState<Todo[]>(() => getFromLocalStorage('todos'));

  useEffect(() => {
    saveToLocalStorage('todos', todo);
  }, [todo]);

  const todoItems = useMemo(
    () => ({
      todo,
      setTodos,
    }),
    [todo],
  );

  const methods = React.useMemo(
    () => ({
      handleDelete(id: number) {
        const uptadetTodo = todo.filter(todoItem => todoItem.id !== id);

        setTodos(uptadetTodo);
        saveToLocalStorage('todos', uptadetTodo);
      },

      handleComplete(id: number) {
        const updatedTodos = todo.map(todoItem =>
          todoItem.id === id
            ? { ...todoItem, completed: !todoItem.completed }
            : todoItem,
        );

        setTodos(updatedTodos);
        saveToLocalStorage('todos', updatedTodos);
      },

      toggleAll() {
        setTodos(allTodo => {
          const completed = allTodo.some(todoItem => !todoItem.completed);
          const updatedTodos = allTodo.map(item => ({ ...item, completed }));

          saveToLocalStorage('todos', updatedTodos);

          return updatedTodos;
        });
      },

      renameTodo(id: number, title: string) {
        setTodos(allTodo => {
          const updatedTodos = allTodo.map(todoItem =>
            todoItem.id === id ? { ...todoItem, title } : todoItem,
          );

          saveToLocalStorage('todos', updatedTodos);

          return updatedTodos;
        });
      },

      clearCompleted() {
        setTodos(allTodo => {
          const activeTodos = allTodo.filter(todoItem => !todoItem.completed);

          saveToLocalStorage('todos', activeTodos);

          return activeTodos;
        });
      },
    }),
    [todo],
  );

  return (
    <MethodsContext.Provider value={methods}>
      <TodoContext.Provider value={todoItems}>{children}</TodoContext.Provider>
    </MethodsContext.Provider>
  );
};
