import React from 'react';
import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/LocalStorage';
import { Filter } from '../types/Filter';

export const TodoContex = React.createContext({
  isInput: '',
  setIsInput: () => {},
  todos: [],
  setTodos: () => {},
  handleSubmit: () => {},
  removeTodo: () => {},
  onDelete: () => {},
  filter: Filter.All,
  setFilter: () => {},
  getFilter: () => {},
  removeAllCompleted: () => {},
  reverseCompleted: () => {},
  completedChecked: () => {},
  renameTodo: () => {},
});
type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [isInput, setIsInput] = useState('');

  const [
    todos,
    setTodos,
    removeTodo,
    removeAllCompleted,
    reverseCompleted,
    completedChecked,
    renameTodo,
  ] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo = {
      id: +new Date(),
      completed: false,
      title: isInput.trim(),
    };

    setTodos([...todos, newTodo]);
    setIsInput('');
  };

  const onDelete = (id: number) => {
    removeTodo(id);
  };

  const getFilter = () => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const value = useMemo(
    () => ({
      isInput,
      setIsInput,
      todos,
      setTodos,
      handleSubmit,
      removeTodo,
      onDelete,
      filter,
      setFilter,
      getFilter,
      removeAllCompleted,
      reverseCompleted,
      completedChecked,
      renameTodo,
    }),
    [isInput, todos, filter],
  );

  return <TodoContex.Provider value={value}>{children}</TodoContex.Provider>;
};
