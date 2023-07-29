import React, { useState } from 'react';
import { Todo } from './types/ToDo';
import { useLocalStorage } from './hooks/LocalStorage';
import { Status } from './types/Status';

type TodosContext = {
  todos: Todo[];
  setTodos: (v: Todo[]) => void;
  visibleTodos: () => Todo[];
  filter: Status;
  setFilter: (v: Status) => void;
  checked: boolean;
  setChecked: (v: boolean) => void;
};

export const TodosContex = React.createContext<TodosContext>({
  todos: [],
  setTodos: () => {},
  visibleTodos: () => [],
  filter: Status.All,
  setFilter: () => { },
  checked: false,
  setChecked: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Status.All);
  const checkedTodo = todos.every(todo => todo.completed) && todos.length > 0;
  const [checked, setChecked] = useState<boolean>(checkedTodo);

  const visibleTodos = () => {
    switch (filter) {
      case Status.Active:
        return todos.filter(todo => todo.completed === false);

      case Status.Completed:
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  };

  const value = {
    todos,
    setTodos,
    visibleTodos,
    filter,
    setFilter,
    checked,
    setChecked,
  };

  return (
    <TodosContex.Provider value={value}>
      {children}
    </TodosContex.Provider>
  );
};
