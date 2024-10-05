import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Todo } from '../../type/Todo';
import { Options } from '../../type/Options';

type Context = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filterTodos: Todo[];
  option: Options;
  setOption: (option: Options) => void;
  addTodo: (title: string) => void;
};

export const TodosContext = React.createContext<Context>({
  todos: [],
  setTodos: () => {},
  filterTodos: [],
  option: Options.All,
  setOption: () => {},
  addTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [option, setOption] = useState<Options>(Options.All);

  const filterTodos = useMemo(() => {
    switch (option) {
      case Options.Active:
        return todos.filter(todo => !todo.completed);

      case Options.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }, [todos, option]);

  const addTodo = useCallback((title: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: +new Date(), title, completed: false },
    ]);
  }, []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filterTodos,
      option,
      setOption,
      addTodo,
    }),
    [todos, setTodos, filterTodos, option, setOption, addTodo],
  );

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');

    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
