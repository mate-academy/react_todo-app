/* eslint-disable max-len */
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Status, TaskType } from '../../types/TaskType';

interface TotodosContext {
  todos: TaskType[],
  setTodos: React.Dispatch<React.SetStateAction<TaskType[]>>,
  filter: Status,
  setFilter: React.Dispatch<React.SetStateAction<Status>>,
  filteredTodos: TaskType[],
  handleStatusChange: (id: number) => void,
  handleRemove: (id: number) => void,
  handleSave: (id: number, editedTodo: string) => void,
}

export const TodosContext = React.createContext<TotodosContext>({
  todos: [],
  setTodos: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  filteredTodos: [],
  handleStatusChange: () => {},
  handleRemove: () => {},
  handleSave: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<Status>(Status.ALL);

  useEffect(() => {
    const data = localStorage.getItem('todos');

    setTodos(JSON.parse(data || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const handleStatusChange = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id
      ? {
        ...todo,
        completed: !todo.completed,
      }
      : todo)));
  };

  const handleRemove = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleSave = (id: number, editedTodo: string) => {
    setTodos(todos.map(todo => (todo.id === id
      ? {
        ...todo,
        title: editedTodo,
      }
      : todo)));
  };

  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
    filteredTodos,
    handleStatusChange,
    handleRemove,
    handleSave,

  }), [todos, filteredTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
