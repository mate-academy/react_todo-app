import {
  FC, ReactNode, createContext, useState, useMemo,
} from 'react';
import { Status, Todo, UpdateTodos } from '../types';
import { getFilteredTodos } from '../utils/getFilteredTodos';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: ReactNode;
};

interface Context {
  todos: Todo[];
  todosCount: number;
  activeTodosLeft: number;
  filterStatus: Status;
  onAddTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: number) => void;
  onDeleteCompetedTodos: () => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onUpdateSeveralTodos: (amountTodosForUpdate: UpdateTodos) => void;
  onFilterStatusChange: (status: Status) => void;
}

export const TodoContext = createContext({} as Context);

export const TodoProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>([], 'todos');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, filterStatus)
  ), [todos, filterStatus]);

  const activeTodosLeft = useMemo(() => (
    todos.reduce((count, todo) => {
      if (!todo.completed) {
        return count + 1;
      }

      return count;
    }, 0)
  ), [todos]);

  const onAddTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const onDeleteTodo = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const onDeleteCompetedTodos = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const onUpdateTodo = (updatedTodo: Todo) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      return todo.id === updatedTodo.id
        ? updatedTodo
        : todo;
    }));
  };

  const onUpdateSeveralTodos = (amountTodosForUpdate: UpdateTodos) => {
    const targetTodos = amountTodosForUpdate === UpdateTodos.Some
      ? todos.filter(todo => !todo.completed)
      : todos;

    setTodos(prevTodos => prevTodos.map(todo => {
      const isTodoForUpdate = targetTodos
        .some(targetTodo => targetTodo.id === todo.id);

      if (isTodoForUpdate) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const contextValue: Context = {
    todos: filteredTodos,
    todosCount: todos.length,
    activeTodosLeft,
    filterStatus,
    onAddTodo,
    onDeleteTodo,
    onDeleteCompetedTodos,
    onUpdateTodo,
    onUpdateSeveralTodos,
    onFilterStatusChange: setFilterStatus,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
