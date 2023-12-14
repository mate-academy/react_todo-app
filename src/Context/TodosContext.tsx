import React, { useState, useMemo } from 'react';
import { Status } from '../Types/Status';
import Todos from '../Types/Todos';

type Props = {
  children: React.ReactNode
};

interface Context {
  todos: Todos[],
  // filterTodos: Todos[],
  status: Status,
  leftCount: number,
  handleTodo: (newTodo: string) => void,
  handleCompleted: (todoId: number) => void,
  handleAllCompleted: () => void,
  // handleNoFilter: () => void,
  // handleActiveFilter: () => void,
  // handleCompletedFilter: () => void,
  handleLeftCount: (filterLength: number) => void,
  handleStatus: (newStatus: Status) => void,
  handleUpdateTodo: (changeId: number, updateTitle: string) => void,
  handleDeleteTodo: (deleteId: number) => void
}
export const TodosContext = React.createContext<Context>({
  todos: [],
  // filterTodos: [],
  status: Status.all,
  leftCount: [].length,
  handleTodo: () => {},
  handleLeftCount: () => {},
  handleCompleted: () => {},
  // handleActiveFilter: () => {},
  // handleNoFilter: () => {},
  // handleCompletedFilter: () => {},
  handleStatus: () => {},
  handleAllCompleted: () => {},
  handleUpdateTodo: () => {},
  handleDeleteTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [status, setStatus] = useState(Status.all);
  const [leftCount, setLeftCount] = useState(todos.length);

  // let filterTodos = todos;

  // const handleNoFilter = () => {
  //   filterTodos = todos;
  // };

  // const handleActiveFilter = () => {
  //   const activeFilter = filterTodos.filter((todo: Todos) => !todo.completed);

  //   filterTodos = activeFilter;
  // };

  // const handleCompletedFilter = () => {
  //   const completedFilter = filterTodos.filter((todo: Todos) => todo.completed);

  //   filterTodos = completedFilter;
  // };

  const handleCompleted = (todoId: number) => {
    setTodos(prevTodos => prevTodos.map(todo => (todo.id === todoId
      ? { ...todo, completed: !todo.completed }
      : todo)));
  };

  const handleAllCompleted = () => {
    const statusCompleted = todos.some(todo => !todo.completed);

    if (statusCompleted) {
      setTodos(prevTodos => prevTodos.map(todo => (todo.completed === false
        ? { ...todo, completed: !todo.completed }
        : todo)));
    } else {
      setTodos(prevTodos => prevTodos.map(
        todo => ({ ...todo, completed: !todo.completed }),
      ));
    }
  };

  const handleTodo = (newPost: string) => {
    setTodos(current => [
      ...current,
      {
        id: +new Date(),
        title: newPost,
        completed: false,
      },
    ]);
  };

  const handleUpdateTodo = (changeId: number, updateTitle: string) => {
    setTodos(prevTodos => prevTodos.map(todo => (todo.id === changeId
      ? { ...todo, title: updateTitle }
      : todo)));
  };

  const handleDeleteTodo = (deleteId: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== deleteId);

    setTodos(filteredTodos);
  };

  const handleStatus = (newStatus: Status) => {
    setStatus(newStatus);
  };

  const handleLeftCount = (filterLength: number) => {
    setLeftCount(filterLength);
  };

  const value = useMemo(() => ({
    todos,
    status,
    leftCount,
    handleTodo,
    handleCompleted,
    // filterTodos,
    // handleActiveFilter,
    // handleCompletedFilter,
    // handleNoFilter,
    handleLeftCount,
    handleStatus,
    handleAllCompleted,
    handleUpdateTodo,
    handleDeleteTodo,
  }), [todos, status, leftCount]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
