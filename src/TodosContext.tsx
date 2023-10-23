import React, { useState, useMemo, useCallback } from 'react';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { useLocalStorage } from './Components/LocalStorage';

type Props = {
  children: React.ReactNode;
};

interface TodosContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  selectStatus: Status;
  addTodos: (title: string) => void;
  setSelectStatus: (status: Status) => void;
  changeStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTitle: (id: number, changedTitle: string) => void;
  filterTodos: (filterStatus: Status, todos: Todo[]) => Todo[];
  deletedCompled: () => void;
  allComplet: () => void;
}

export const TodosContext = React.createContext<TodosContextType >({
  todos: [],
  selectStatus: Status.All,
  filteredTodos: [],
  addTodos: () => {},
  setSelectStatus: () => {},
  changeStatus: () => {},
  deleteTodo: () => {},
  changeTitle: () => {},
  filterTodos: () => [],
  deletedCompled: () => {},
  allComplet: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [selectStatus, setSelectStatus] = useState(Status.All);

  const addTodos = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const changeStatus = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const changeTitle = (id: number, changedTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: changedTitle }
      : prevTodo)));
  };

  const deletedCompled = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filterTodos = useCallback((filterStatus: Status) => {
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
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return filterTodos(selectStatus);
  }, [selectStatus, filterTodos]);

  const allComplet = () => {
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
        // incompletedTodosLeft,
        selectStatus,
        setSelectStatus,
        changeStatus,
        deleteTodo,
        changeTitle,
        filterTodos,
        deletedCompled,
        filteredTodos,
        allComplet,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
