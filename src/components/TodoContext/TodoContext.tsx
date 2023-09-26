import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Status, TaskType } from '../../types/TaskType';

interface TotodosContext {
  todos: TaskType[],
  addTodo: React.Dispatch<React.SetStateAction<TaskType[]>>,
  filter: Status,
  setFilter: React.Dispatch<React.SetStateAction<Status>>,
  filteredTodos: () => TaskType[]
}

export const TodosContext = React.createContext<TotodosContext>({
  todos: [],
  addTodo: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  filteredTodos: () => [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, addTodo] = useState<TaskType[]>([]);
  const [filter, setFilter] = useState<Status>(Status.ALL);

  useEffect(() => {
    const todosToStore = todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }));

    localStorage.setItem('todos', JSON.stringify(todosToStore));
  }, [todos]);

  const filteredTodos = useCallback(() => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'All':
      default:
        return todos;
    }
  }, [filter, todos]);

  const value = useMemo(() => ({
    todos,
    addTodo,
    filter,
    setFilter,
    filteredTodos,
  }), [todos, filteredTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
