import React, { FC, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterBy } from '../types/FilterBy';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodoContextType {
  todos: Todo[];
  filterBy: FilterBy;
  setTodos: (todos: Todo[]) => void;
  filteredTodos: Todo[];
  handleAddTodo: (newTodo: Todo) => void;
  handleDeleteTodo: (todoId: number) => void;
  handleUpdateTodo: (todo: Todo) => void;
  changeAllIsCompleted: () => void;
  handleDeleteCompleted: () => void;
  setFilterBy: (status: FilterBy) => void;
}

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  filterBy: FilterBy.All,
  setTodos: () => {},
  filteredTodos: [],
  handleAddTodo: () => {},
  handleDeleteTodo: () => {},
  changeAllIsCompleted: () => {},
  handleUpdateTodo: () => {},
  handleDeleteCompleted: () => {},
  setFilterBy: () => {},
});

const filterTodo = (todos: Todo[], filterBy: FilterBy) => {
  switch (filterBy) {
    case FilterBy.Completed:
      return todos.filter(todo => todo.completed);
    case FilterBy.Active:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState(FilterBy.All);

  const filteredTodos = useMemo(() => {
    return filterTodo(todos, filterBy);
  }, [todos, filterBy]);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    );

    setTodos(updatedTodos);
  };

  const changeAllIsCompleted = () => {
    if (todos.every(todo => todo.completed)) {
      setTodos(
        todos.map(todo => {
          const newTodo = { ...todo, completed: false };

          return newTodo;
        }),
      );

      return;
    }

    setTodos(
      todos.map(todo => {
        const newTodo = { ...todo, completed: true };

        return newTodo;
      }),
    );
  };

  const handleDeleteTodo = (todoId: number) => {
    const todosAfterDelete = todos.filter(todo => todo.id !== todoId);

    setTodos(todosAfterDelete);
  };

  const handleDeleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const value = useMemo(
    () => ({
      todos,
      filterBy,
      filteredTodos,
      setTodos,
      handleUpdateTodo,
      handleAddTodo,
      handleDeleteTodo,
      changeAllIsCompleted,
      handleDeleteCompleted,
      setFilterBy,
    }),
    [filteredTodos, todos, filterBy],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
