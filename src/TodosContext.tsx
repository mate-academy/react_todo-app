import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Context } from './types/Context';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const TodosContext = React.createContext<Context>({
  todos: [],
  todoCount: 0,
  completedTodos: false,
  addTodo: () => {},
  toggleTodo: () => {},
  handleToggleAll: () => {},
  removeTodo: () => {},
  deleteCompletedTodos: () => {},
  filterTodos: () => [],
  editTodo: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (todoId: number) => {
    setTodos(todos.map(todo => (
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    )));
  };

  const handleToggleAll = () => {
    const completedAll = todos.every(todo => todo.completed);

    const updated = todos.map(todo => ({
      ...todo, completed: !completedAll,
    }));

    setTodos(updated);
  };

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter(post => post.id !== todoId));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  const filterTodos = (filter: string) => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      case Filter.All:
      default:
        return todos;
    }
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(todo => (todo.id === id
      ? { ...todo, title: newTitle }
      : todo)));
  };

  const completedTodos = todos.some(todo => todo.completed === true);
  const todoCount = todos.filter(todo => todo.completed === false).length;

  const value = {
    todos,
    todoCount,
    completedTodos,
    addTodo,
    toggleTodo,
    handleToggleAll,
    removeTodo,
    deleteCompletedTodos,
    filterTodos,
    editTodo,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
