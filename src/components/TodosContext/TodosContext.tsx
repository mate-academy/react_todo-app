import React, { useState, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Status } from '../../types/Status';

type Props = {
  children: React.ReactNode;
};

interface TodosContextType {
  todos: Todo[];
  addTodos: (title: string) => void;
  incompletedTodosLeft: number;
  selectedStatus: Status;
  setSelectedStatus: (status: Status) => void;
  switchTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTodoTitle: (id: number, changedTitle: string) => void;
  filterTodos: (filterStatus: Status, todos: Todo[]) => Todo[];
  deletedComplatedTodos: () => void;
  filteredTodos: Todo[];
  handleAllCompleted: () => void;
}

export const TodosContext = React.createContext<TodosContextType >({
  todos: [],
  addTodos: () => {},
  incompletedTodosLeft: 0,
  selectedStatus: Status.All,
  setSelectedStatus: () => {},
  switchTodo: () => {},
  deleteTodo: () => {},
  changeTodoTitle: () => {},
  filterTodos: () => [],
  deletedComplatedTodos: () => {},
  filteredTodos: [],
  handleAllCompleted: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [selectedStatus, setSelectedStatus] = useState(Status.All);

  const addTodos = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const incompletedTodosLeft = todos.filter(
    todo => todo.completed === false,
  ).length;

  const switchTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeTodoTitle = (id: number, changedTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: changedTitle }
      : prevTodo)));
  };

  const deletedComplatedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filterTodos = (filterStatus: Status) => {
    switch (filterStatus) {
      case Status.All:
        return todos;

      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(selectedStatus);
  }, [selectedStatus, todos]);

  const handleAllCompleted = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    const updateCompletedTodos = todos.map((todo) => ({
      ...todo, completed: !allCompleted,
    }));

    setTodos(updateCompletedTodos);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodos,
        incompletedTodosLeft,
        selectedStatus,
        setSelectedStatus,
        switchTodo,
        deleteTodo,
        changeTodoTitle,
        filterTodos,
        deletedComplatedTodos,
        filteredTodos,
        handleAllCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
