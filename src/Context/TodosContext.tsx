import React, { useState, useMemo } from 'react';
import Todos from '../Types/Todos';

type Props = {
  children: React.ReactNode
};

interface Context {
  todos: Todos[],
  handleTodo: (newTodo: string) => void,
  handleCompleted: (todoId: number) => void,
  handleAllCompleted: () => void,
  handleUpdateTodo: (changeId: number, updateTitle: string) => void
}
export const TodosContext = React.createContext<Context>({
  todos: [],
  handleTodo: () => {},
  handleCompleted: () => {},
  handleAllCompleted: () => {},
  handleUpdateTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todos[]>([]);

  const handleCompleted = (todoId: number) => {
    setTodos(prevTodos => prevTodos.map(todo => (todo.id === todoId
      ? { ...todo, completed: !todo.completed }
      : todo)));
  };

  const handleAllCompleted = () => {
    const status = todos.some(todo => !todo.completed);

    if (status) {
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

  const value = useMemo(() => ({
    todos,
    handleTodo,
    handleCompleted,
    handleAllCompleted,
    handleUpdateTodo,
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
