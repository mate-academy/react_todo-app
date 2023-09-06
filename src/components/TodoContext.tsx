import React, { useState, useEffect } from 'react';
import { Status } from '../types/StatusEnum';
import { Todo } from '../types/Todo';
import { TodoContextType } from '../types/TodosContext';

export const TodosContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => { },
  toggleTodo: () => { },
  deleteTodo: () => { },
  updateTodoTitle: () => { },
  deleteCompletedTodos: () => { },
  handleToggleAll: () => { },
  incompletedTodosCount: 0,
  hasCompletedTodos: false,
  filterTodos: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTask: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTask]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(
      (todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToggleAll = () => {
    const hasAllCompleted = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => ({
      ...todo, completed: !hasAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const incompletedTodosCount = todos.filter(
    (todo) => !todo.completed,
  ).length;

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const filterTodos = (filterStatus: string) => {
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

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    const todosToStore = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }));

    localStorage.setItem('todos', JSON.stringify(todosToStore));
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodoTitle,
        deleteCompletedTodos,
        handleToggleAll,
        incompletedTodosCount,
        hasCompletedTodos,
        filterTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
