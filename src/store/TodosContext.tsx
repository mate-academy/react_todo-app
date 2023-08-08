import React, { useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { FilterBy } from '../types/FilterBy';
import { TodoContextProps } from '../types/TodoContextProps';

export const TodosContext = React.createContext<TodoContextProps>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodos: () => {},
  filterValue: FilterBy.ALL,
  setFilterValue: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterValue, setFilterValue] = useState<FilterBy>(FilterBy.ALL);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (deleteId: number) => {
    const filteredTodos = todos.filter(({ id }) => id !== deleteId);

    setTodos(filteredTodos);
  };

  const updateTodos = (todoId: number, args: Partial<Todo>) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, ...args };
    });

    setTodos(updatedTodos);
  };

  const value = useMemo(() => ({
    todos,
    setTodos,
    addTodo,
    deleteTodo,
    updateTodos,
    filterValue,
    setFilterValue,
  }), [todos, filterValue]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
