/* eslint-disable max-len */
import React, {
  useCallback,
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
  filteredTodos: () => TaskType[],
  handleChangeStatus: (id: number) => void,
  handleRemoveTodo: (id: number) => void,
  saveChanges: (id: number, editedTodo: string) => void,
}

export const TodosContext = React.createContext<TotodosContext>({
  todos: [],
  setTodos: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  filteredTodos: () => [],
  handleChangeStatus: () => {},
  handleRemoveTodo: () => {},
  saveChanges: () => {},
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

  const filteredTodos = useCallback(() => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const handleChangeStatus = (id: number) => {
    setTodos((currentTodos) => currentTodos.map((currentTodo) => (currentTodo.id === id
      ? {
        ...currentTodo,
        completed: !currentTodo.completed,
      }
      : currentTodo)));
  };

  const handleRemoveTodo = (id: number) => {
    setTodos((currentTodos) => currentTodos.filter((curTodo) => curTodo.id !== id));
  };

  const saveChanges = (id: number, editedTodo: string) => {
    setTodos((currentTodos) => currentTodos.map((currTodo) => (currTodo.id === id
      ? {
        ...currTodo,
        title: editedTodo,
      }
      : currTodo)));
  };

  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
    filteredTodos,
    handleChangeStatus,
    handleRemoveTodo,
    saveChanges,

  }), [todos, filteredTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
