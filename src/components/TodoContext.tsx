import React, { createContext, useState, useEffect } from 'react';
import { Todo } from '../type/Todo';

type FilterType = 'All' | 'Active' | 'Completed';

export type TodoContextType = {
  todos: Todo[];
  newTodo: string;
  filter: FilterType;
  setTodos: (todos: Todo[]) => void;
  setNewTodo: (todoText: string) => void;
  setFilter: (filter: FilterType) => void;
};

const initialTodoContext: TodoContextType = {
  todos: [],
  newTodo: '',
  filter: 'All',
  setTodos: () => {},
  setNewTodo: () => {},
  setFilter: () => {},
};

export const TodoContext = createContext<TodoContextType>(initialTodoContext);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const todosAreCompleted =
    todos.filter(todo => todo.completed).length === todos.length;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos, todosAreCompleted]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') as string);

    localStorage.setItem('todos', JSON.stringify(storedTodos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        newTodo,
        filter,
        setNewTodo,
        setFilter,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
