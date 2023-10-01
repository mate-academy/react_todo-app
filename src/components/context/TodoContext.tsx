import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoContextType } from '../../types/TodoContext';
import { Status } from '../../types/StatusEnum';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const STORAGE_KEY = 'todos';

export const TodosContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  updateTodoTitle: () => {},
  deleteCompletedTodos: () => {},
  handleToggleAll: () => {},
  filterTodos: () => [],
  hasCompletedTodos: false,
  incompletedTodosCount: 0,
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

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(
      (todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const handleToggleAll = () => {
    const hasAllCompleted = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => ({
      ...todo, completed: !hasAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  const incompletedTodosCount = todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const filterTodos = (filterStatus: Status) => {
    switch (filterStatus) {
      case Status.Active:
        return todos.filter(todo => !todo.completed);

      case Status.Completed:
        return todos.filter(todo => todo.completed);

      case Status.All:
      default:
        return todos;
    }
  };

  const value = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodoTitle,
    deleteCompletedTodos,
    handleToggleAll,
    filterTodos,
    hasCompletedTodos,
    incompletedTodosCount,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
