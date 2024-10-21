import React, { useEffect, useState } from 'react';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { getStoredTodos } from '../../utils/getStoredTodos';
import { storeTodos } from '../../utils/storeTodos';

type TodoContextType = {
  todos: Todo[];
  title: string;
  filterStatus: Status;
  setTitle: (title: string) => void;
  setFilterStatus: (status: Status) => void;
  addNewTodo: (newTitle: string) => void;
  deleteSelectTodo: (todoId: number) => void;
  handleEditTitle: (newTitle: string, currentTodo: Todo) => void;
  handleUpdateComplete: (todo: Todo) => void;
  handleClearComplete: () => void;
  handleAllChangeStatus: () => void;
  filteredTodos: Todo[];
};

const defaultContext: TodoContextType = {
  todos: [],
  title: '',
  filterStatus: Status.All,
  setTitle: () => {},
  setFilterStatus: () => {},
  addNewTodo: () => {},
  deleteSelectTodo: () => {},
  handleEditTitle: () => {},
  handleUpdateComplete: () => {},
  handleClearComplete: () => {},
  handleAllChangeStatus: () => {},
  filteredTodos: [],
};

export const TodoContext = React.createContext<TodoContextType>(defaultContext);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status>(Status.All);

  useEffect(() => {
    const currentTodos = getStoredTodos();

    if (currentTodos.length) {
      setTodos(currentTodos);
    } else {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }, []);

  const filterTodosByStatus = () => {
    switch (filterStatus) {
      case Status.Active:
        return todos.filter((todo: Todo) => !todo.completed);

      case Status.Completed:
        return todos.filter((todo: Todo) => todo.completed);

      default:
        return todos;
    }
  };

  const filteredTodos = filterTodosByStatus();

  const addNewTodo = (newTitle: string) => {
    const trimedTitle = newTitle.trim();

    if (trimedTitle) {
      const newTodo = {
        title: trimedTitle,
        completed: false,
        id: +new Date(),
      };
      const newTodos = [...todos, newTodo];

      setTodos(newTodos);
      storeTodos(newTodos);
      setTitle('');
    }
  };

  const deleteSelectTodo = (todoId: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
    storeTodos(updatedTodos);
  };

  const handleEditTitle = (newTitle: string, currentTodo: Todo) => {
    const currentTodos = todos.map((todo: Todo) =>
      todo.id === currentTodo.id ? { ...todo, title: newTitle } : todo,
    );

    setTodos(currentTodos);
    storeTodos(currentTodos);
  };

  const handleUpdateComplete = (todo: Todo) => {
    const currentTodos = todos.map((item: Todo) =>
      item.id === todo.id ? { ...item, completed: !item.completed } : item,
    );

    setTodos(currentTodos);
    storeTodos(currentTodos);
  };

  const handleClearComplete = () => {
    const currentTodos = todos.filter((todo: Todo) => !todo.completed);

    setTodos(currentTodos);
    storeTodos(currentTodos);
  };

  const handleAllChangeStatus = () => {
    const allCompleted = todos.every(todo => todo.completed);

    const changedTodos = todos.map((item: Todo) => ({
      ...item,
      completed: allCompleted ? false : true,
    }));

    setTodos(changedTodos);
    storeTodos(changedTodos);
  };

  const valuesContext = {
    todos,
    title,
    filterStatus,
    setTitle,
    setFilterStatus,
    addNewTodo,
    deleteSelectTodo,
    handleEditTitle,
    handleUpdateComplete,
    handleClearComplete,
    handleAllChangeStatus,
    filteredTodos,
  };

  return (
    <TodoContext.Provider value={valuesContext}>
      {children}
    </TodoContext.Provider>
  );
};
