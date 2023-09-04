import React from 'react';
import { TodoContextType } from '../types/TodoContextType';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { Status } from '../types/StatusEnum';

const STORAGE_KEY = 'todos';

export const TodosContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  updateTodoTitle: () => {},
  deleteCompletedTodos: () => {},
  handleToggleAll: () => {},
  incompletedTodosCount: 0,
  hasCompletedTodos: false,
  filterTodos: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, [] as Todo[]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
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

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToogleAll = () => {
    const hasAllCompleted = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => ({
      ...todo, completed: !hasAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const incompletedTodosCount = todos.filter(
    (todo: Todo) => !todo.completed,
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

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodoTitle,
        deleteCompletedTodos,
        handleToggleAll: handleToogleAll,
        incompletedTodosCount,
        hasCompletedTodos,
        filterTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
