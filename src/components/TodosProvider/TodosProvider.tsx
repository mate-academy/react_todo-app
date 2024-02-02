/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../utils/LocalStorage';

export const TodoContext = React.createContext<Todo[]>([]);

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
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
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
