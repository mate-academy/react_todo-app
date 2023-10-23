import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../services/EnumStatusFilter';
import { useLocaleStorage } from '../hooks/useLocaleStorage';
import { Context } from '../services/Context';

type Props = {
  children: React.ReactNode,
};

export const TodoContext = React.createContext<Context>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  count: 0,
  title: '',
  setTitle: () => {},
  updateTodo: () => {},
  checkedAll: () => {},
  selTodoFilterList: Status.ALL,
  setSelTodoFilterList: () => {},
  deleteTodo: () => {},
  deleteAllCompleted: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [title, setTitle] = useState('');
  const count = todos.filter((todo) => !todo.completed).length;
  const [
    selTodoFilterList,
    setSelTodoFilterList,
  ] = useState(Status.ALL);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const updateTodo = (upTodo: Todo) => {
    setTodos(todos.map(todo => (upTodo.id === todo.id
      ? upTodo
      : todo
    )));
  };

  const checkedAll = () => {
    const isTodosCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(currentTodo => {
      return {
        ...currentTodo,
        completed: !isTodosCompleted,
      };
    }));
  };

  const deleteTodo = (todoId: number) => {
    setTodos([...(todos.filter((currTodo) => currTodo.id !== todoId))]);
  };

  const deleteAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const value = {
    todos,
    setTodos,
    addTodo,
    count,
    title,
    setTitle,
    updateTodo,
    checkedAll,
    selTodoFilterList,
    setSelTodoFilterList,
    deleteTodo,
    deleteAllCompleted,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
