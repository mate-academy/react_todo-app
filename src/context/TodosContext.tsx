import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterValue } from '../types/FilterValue';
import { FunctionTodo } from '../types/FunctionTodo';

type TodosProviderProps = {
  children: React.ReactNode;
};

type TodosContextProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  changeTodos: (todo: Todo, action: FunctionTodo) => void;
  filterValue: FilterValue;
  setFilterValue: (val: FilterValue) => void;
  visibleTodos: Todo[];
};

export const TodosContext = React.createContext<TodosContextProps>({
  todos: [],
  setTodos: () => {},
  changeTodos: () => {},
  filterValue: FilterValue.All,
  setFilterValue: () => {},
  visibleTodos: [],
});

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localTodos = localStorage.getItem('todos');

    if (localTodos) {
      return JSON.parse(localTodos) as Todo[];
    }

    return [];
  });

  const [filterValue, setFilterValue] = useState<FilterValue>(FilterValue.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const changeTodos = (todo: Todo, action: FunctionTodo) => {
    setTodos(prevTodos => {
      let updatedTodos = prevTodos;

      switch (action) {
        case 'add':
          updatedTodos = [...prevTodos, todo];
          break;
        case 'update':
          updatedTodos = prevTodos.map(td => (td.id === todo.id ? todo : td));
          break;
        case 'delete':
          updatedTodos = prevTodos.filter(td => td.id !== todo.id);
          break;
      }

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const visibleTodos = useMemo(() => {
    switch (filterValue) {
      case FilterValue.Active:
        return todos.filter(td => !td.completed);
      case FilterValue.Completed:
        return todos.filter(td => td.completed);
      default:
        return todos;
    }
  }, [todos, filterValue]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      changeTodos,
      filterValue,
      setFilterValue,
      visibleTodos,
    }),
    [todos, visibleTodos, filterValue],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
