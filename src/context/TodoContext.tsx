import {
  FC, ReactNode, createContext, useState, useMemo,
} from 'react';
import { Status, Todo } from '../types';
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
  handleUpdateTodoTitle: (todoToUpdate: Todo, newTitle: string) => void;
  handleToggleTodoStatus: (todoToUpdate: Todo) => void;
  onToggleSeveralTodos: () => void;
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
    todos.filter(todo => !todo.completed).length
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
    setTodos(prevTodos => prevTodos.map(todo => (
      todo.id === updatedTodo.id
        ? updatedTodo
        : todo
    )));
  };

  const handleUpdateTodoTitle = (todoToUpdate: Todo, newTitle: string) => {
    if (todoToUpdate.title === newTitle) {
      return;
    }

    if (!newTitle.trim()) {
      onDeleteTodo(todoToUpdate.id);

      return;
    }

    const updatedTodo: Todo = {
      ...todoToUpdate,
      title: newTitle,
    };

    onUpdateTodo(updatedTodo);
  };

  const handleToggleTodoStatus = (todoToUpdate: Todo) => {
    const updatedTodo: Todo = {
      ...todoToUpdate,
      completed: !todoToUpdate.completed,
    };

    onUpdateTodo(updatedTodo);
  };

  const onToggleSeveralTodos = () => {
    const nextTodoStatus = todos.some(todo => !todo.completed);

    setTodos(prevTodos => prevTodos.map(todo => (
      {
        ...todo,
        completed: nextTodoStatus,
      }
    )));
  };

  const contextValue = useMemo<Context>(() => ({
    todos: filteredTodos,
    todosCount: todos.length,
    activeTodosLeft,
    filterStatus,
    onAddTodo,
    onDeleteTodo,
    onDeleteCompetedTodos,
    handleUpdateTodoTitle,
    handleToggleTodoStatus,
    onToggleSeveralTodos,
    onFilterStatusChange: setFilterStatus,
  }), [todos, activeTodosLeft, filterStatus]);

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};
