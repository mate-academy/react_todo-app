import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';
import { TodoContextType } from '../types/TodoContextType';
import { Status } from '../types/Status';

export const TodosContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  deleteCompletedTodos: () => {},
  updateTodoTitle: () => {},
  toggleTodo: () => {},
  handleToggleAll: () => {},
  filterTodos: () => [],
});

export const useTodos = () => React.useContext(TodosContext);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    'todos', [] as Todo[],
  );

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(
      todos.map((prevTodo: Todo) => (prevTodo.id === id
        ? { ...prevTodo, title: newTitle }
        : prevTodo)),
    );
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(
      (todo: Todo) => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo),
    ));
  };

  const handleToggleAll = () => {
    const hasAllCompleted = todos.every((todo: Todo) => todo.completed);

    const updatedTods = todos.map((todo: Todo) => ({
      ...todo, completed: !hasAllCompleted,
    }));

    setTodos(updatedTods);
  };

  const filterTodos = (status: Status) => {
    switch (status) {
      case Status.All:
        return todos;

      case Status.Active:
        return todos.filter((todo: Todo) => !todo.completed);

      case Status.Completed:
        return todos.filter((todo: Todo) => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        deleteCompletedTodos,
        updateTodoTitle,
        toggleTodo,
        handleToggleAll,
        filterTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
