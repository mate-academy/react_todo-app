import React from 'react';
import { TodoContext as TodoContextType } from '../types/TodoContext';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

const STORAGE_KEY = 'todos';

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => { },
  toggleTodo: () => { },
  deleteTodo: () => { },
  deleteCompletedTodos: () => { },
  updateTodoTitle: () => { },
  handleToggleAll: () => { },
  incompletedTodoCount: 0,
  hasCompletedTodos: false,
  filterTodos: () => [],
});

type TodosProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, [] as Todo[]);

  const addTodo = (title: string) => {
    const updateTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, updateTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(
      todo => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const updateTodoTitle = (id: number, editedTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: editedTitle }
      : prevTodo)));
  };

  const handleToggleAll = () => {
    const hasAllCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo, completed: !hasAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const incompletedTodoCount = todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;

  const hasCompletedTodos = todos.some(todo => todo.completed);

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
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodoTitle,
        deleteCompletedTodos,
        handleToggleAll,
        incompletedTodoCount,
        hasCompletedTodos,
        filterTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
