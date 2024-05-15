import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type ContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  addTodo: (event: React.FormEvent) => void;
  filteredTodos: Todo[];
  filter: Filter;
  setFilter: (newFilter: Filter) => void;
  titleRef: React.MutableRefObject<HTMLInputElement | null> | null;
  editRef: React.MutableRefObject<HTMLInputElement | null> | null;
  handleFilterChange: (filterType: Filter) => void;
  deleteTodo: (todoId: number) => void;
  toggleTodo: (todoId: number) => void;
  toggleAll: () => void;
  changeTodo: (todoId: number, newTitle: string) => void;
  clearCompleted: () => void;
};

export const TodoContext = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  addTodo: () => {},
  filteredTodos: [],
  filter: Filter.All,
  setFilter: () => {},
  titleRef: null,
  editRef: null,
  handleFilterChange: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  changeTodo: () => {},
  clearCompleted: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(Filter.All);

  const titleRef = useRef<HTMLInputElement | null>(null);
  const editRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    switch (filter) {
      case Filter.Active:
        filtered = todos.filter(todo => !todo.completed);
        break;
      case Filter.Completed:
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    return filtered;
  }, [filter, todos]);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: Date.now(),
        title: title.trim(),
        completed: false,
      },
    ]);

    setTitle('');
  };

  const changeTodo = (todoId: number, newTitle: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId
          ? { ...todo, title: newTitle.trim(), isEdit: false }
          : todo,
      ),
    );
  };

  const handleFilterChange = (filterType: Filter) => {
    setFilter(filterType);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const toggleTodo = (todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const allCompleted = filteredTodos.every(todo => todo.completed);

  const allActive = filteredTodos.every(todo => !todo.completed);

  const toggleAll = () => {
    if (allCompleted || allActive) {
      setTodos(prevTodos =>
        prevTodos.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
      );
    } else {
      {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            !todo.completed ? { ...todo, completed: true } : todo,
          ),
        );
      }
    }
  };

  const clearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const value = {
    todos,
    setTodos,
    title,
    setTitle,
    addTodo,
    filteredTodos,
    filter,
    setFilter,
    titleRef,
    handleFilterChange,
    deleteTodo,
    toggleTodo,
    toggleAll,
    changeTodo,
    clearCompleted,
    editRef,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
