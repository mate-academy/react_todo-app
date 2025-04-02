import React, { FC, useMemo, useState } from 'react';
import { FilterStatus, Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodoContextType {
  todos: Todo[];
  filterStatus: FilterStatus;
  setTodos: (todos: Todo[]) => void;
  filteredTodos: Todo[];
  handleAddTodo: (newTodo: Todo) => void;
  handleOnDelete: (todoId: number) => void;
  handleUpdateTodo: (todo: Todo) => void;
  handleCheckAll: () => void;
  handleClearAllCompleted: () => void;
  setFilterStatus: (status: FilterStatus) => void;
}

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  filterStatus: FilterStatus.DEFAULT,
  setTodos: () => {},
  filteredTodos: [],
  handleAddTodo: () => {},
  handleOnDelete: () => {},
  handleCheckAll: () => {},
  handleUpdateTodo: () => {},
  handleClearAllCompleted: () => {},
  setFilterStatus: () => {},
});

const filterTodo = (todos: Todo[], filterStatus: FilterStatus) => {
  switch (filterStatus) {
    case FilterStatus.COMPLETED:
      return todos.filter(todo => todo.completed);
    case FilterStatus.ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.DEFAULT);

  const filteredTodos = useMemo(() => {
    return filterTodo(todos, filterStatus);
  }, [todos, filterStatus]);

  //handlers
  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    );

    setTodos(updatedTodos);
  };

  const handleCheckAll = () => {
    const completeAll = todos.some(todo => !todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: completeAll,
    }));

    setTodos(updatedTodos);
  };

  const handleOnDelete = (todoId: number) => {
    const todosAfterDelete = todos.filter(todo => todo.id !== todoId);

    setTodos(todosAfterDelete);
  };

  const handleClearAllCompleted = () => {
    const todosWithoutCompleted = todos.filter(todo => !todo.completed);

    setTodos(todosWithoutCompleted);
  };

  const value = useMemo(
    () => ({
      todos,
      filterStatus,
      filteredTodos,
      setTodos,
      handleUpdateTodo,
      handleAddTodo,
      handleOnDelete,
      handleCheckAll,
      handleClearAllCompleted,
      setFilterStatus,
    }),
    [filteredTodos, todos, filterStatus],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
