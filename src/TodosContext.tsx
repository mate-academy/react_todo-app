import React, { useMemo, useState } from 'react';
import { Status } from './Types/Status';
import { Todo } from './Types/Todo';
import { useLocalStorage } from './LocalStorage';

type TodosContextType = {
  todos: Todo[];
  newTodo: string;
  filter: Status;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: (todoTitle: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  toggleAll: () => void;
  removeTodo: (id: number) => void;
  toggleToDo: (id: number) => void;
  editToDo: (id: number, newTitle: string) => void;
  filteredToDo: () => Todo[];
  setFilter: (status: Status) => void;
};

const initialTodos: Todo[] = [];

const initialState: TodosContextType = {
  todos: initialTodos,
  newTodo: '',
  filter: Status.All,
  handleInputChange: () => {},
  addTodo: () => {},
  handleKeyDown: () => {},
  handleClear: () => {},
  toggleAll: () => {},
  removeTodo: () => {},
  toggleToDo: () => {},
  editToDo: () => {},
  filteredToDo: () => initialTodos,
  setFilter: () => {},
};

export const TodosContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<Status>(Status.All);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (todoTitle: string) => {
    if (todoTitle.trim()) {
      const newTodoItem = {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      };

      setTodos([...todos, newTodoItem]);

      setNewTodo('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo(newTodo);
    }
  };

  const handleClear = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);

    setTodos(updatedTodos);
  };

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  };

  const toggleToDo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const editToDo = (id: number, newTitle: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const filteredToDo = () => {
    switch (filter) {
      case Status.Active:
        return todos.filter((el) => !el.completed);
      case Status.Completed:
        return todos.filter((el) => el.completed);
      default:
        return todos;
    }
  };

  const value = useMemo(
    () => ({
      todos,
      newTodo,
      filter,
      handleInputChange,
      addTodo,
      handleKeyDown,
      handleClear,
      toggleAll,
      removeTodo,
      toggleToDo,
      editToDo,
      filteredToDo,
      setFilter,
    }),
    [todos, newTodo, filter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
