/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../utils/LocalStorage';

const sTodos: Todo[] = [
  {
    id: 1,
    title: '1 todo',
    completed: false,
  },
  {
    id: 2,
    title: '2 todo',
    completed: false,
  },
  {
    id: 3,
    title: '3 todo',
    completed: true,
  },
  {
    id: 4,
    title: '4 todo',
    completed: false,
  },
];

export const TodoContext = React.createContext(sTodos);

export const TodoUpdateContext = React.createContext({
  addTodo: (_title: string) => {},
  deleteTodo: (_todoId: number) => {},
  editTodo: (_todo: Todo) => {},
  completeTodo: (_todoId: number) => {},
  uncompleteTodo: (_todoId: number) => {},
  removeAllCompleted: () => {},
  toogleAll: (_completed: boolean) => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  function generateNewId(array: Todo[]): number {
    return +(String(array.length + 1) + 0 + Date.now());
  }

  function addTodo(todoTitle: string): void {
    const todo: Todo = {
      id: generateNewId(todos),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, todo]);
  }

  function editTodo(todo: Todo): void {
    setTodos(prevTodos => {
      const todosCopy = [...prevTodos];
      const prevTodoIndex = todosCopy.findIndex(
        currentTodo => todo.id === currentTodo.id,
      );
      const updatedTodo: Todo = {
        ...todosCopy[prevTodoIndex],
        title: todo.title,
      };

      todosCopy[prevTodoIndex] = updatedTodo;

      return todosCopy;
    });
  }

  function deleteTodo(todoId: number) {
    setTodos(prevTodos => {
      const todosCopy = [...prevTodos];
      const prevTodoIndex = todosCopy.findIndex(
        currentTodo => todoId === currentTodo.id,
      );

      todosCopy.splice(prevTodoIndex, 1);

      return (todosCopy);
    });
  }

  function toogleAll(completed: boolean):void {
    setTodos(prevTodos => {
      const copy = [...prevTodos];
      const changedCopy = copy.map(todo => ({ ...todo, completed }));

      return changedCopy;
    });
  }

  function completeTodo(todoId: number) {
    setTodos(prevTodos => {
      const todosCopy = [...prevTodos];
      const todoIndex = todosCopy.findIndex(
        currentTodo => todoId === currentTodo.id,
      );

      const completedTodo: Todo = { ...todosCopy[todoIndex], completed: true };

      todosCopy[todoIndex] = completedTodo;

      return todosCopy;
    });
  }

  function uncompleteTodo(todoId: number) {
    setTodos(prevTodos => {
      const todosCopy = [...prevTodos];
      const todoIndex = todosCopy.findIndex(
        currentTodo => todoId === currentTodo.id,
      );

      const completedTodo: Todo = { ...todosCopy[todoIndex], completed: false };

      todosCopy[todoIndex] = completedTodo;

      return todosCopy;
    });
  }

  function removeAllCompleted():void {
    setTodos(prevTodos => {
      const todosCopy = [...prevTodos];

      while (todosCopy.some(todo => todo.completed === true)) {
        const index = todosCopy.findIndex(todo => todo.completed === true);

        todosCopy.splice(index, 1);
      }

      return todosCopy;
    });
  }

  return (
    <TodoUpdateContext.Provider
      value={{
        addTodo,
        editTodo,
        completeTodo,
        uncompleteTodo,
        deleteTodo,
        removeAllCompleted,
        toogleAll,
      }}
    >
      <TodoContext.Provider value={todos}>
        {children}
      </TodoContext.Provider>
    </TodoUpdateContext.Provider>

  );
};
