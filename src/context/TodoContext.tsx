/* eslint no-console: ["error", { allow: ["warn", "log", "error"] }] */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../api/todos';
import { PayloadProps } from '../types/PayloadProps';
import { Filter } from '../types/Filter';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodoContextProps {
  todos: Todo[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, payload: PayloadProps) => void;
  countActive: number;
  allCompleted: boolean;
  newTodoInput: React.MutableRefObject<HTMLInputElement | null>;
  clearCompleted: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleToggleAll: () => void;
  noCompleted: boolean;
  noTodos: boolean;
  todoTitle: string;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TodoContext = createContext<TodoContextProps>({
  todos: [],
  filter: Filter.ALL,
  setFilter: () => {},
  removeTodo: () => {},
  updateTodo: () => {},
  countActive: 0,
  allCompleted: false,
  newTodoInput: { current: null },
  clearCompleted: () => {},
  handleSubmit: () => {},
  handleToggleAll: () => {},
  noCompleted: false,
  noTodos: false,
  todoTitle: '',
  setTodoTitle: () => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoTitle, setTodoTitle] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const completedTodos = todos.filter((todo: Todo) => todo.completed === true);
  const countActive = todos.length - completedTodos.length;
  const allCompleted = countActive === 0;
  const newTodoInput = useRef<HTMLInputElement | null>(null);
  const noCompleted = !completedTodos.length;
  const noTodos = !todos.length;

  useEffect(() => {
    newTodoInput.current?.focus();
  }, [todos]);

  const removeTodo = async (todoId: number) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(newTodos);
  };

  const updateTodo = async (id: number, payload: PayloadProps) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...payload } : todo,
    );

    setTodos(updatedTodos);
  };

  const clearCompleted = async () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      userId: USER_ID,
      title: trimmedTitle,
      completed: false,
    };

    setTodos(current => [...current, newTodo]);
    setTodoTitle('');
  };

  const handleToggleAll = async () => {
    const completed = allCompleted ? false : true;

    setTodos(prev => prev.map(todo => ({ ...todo, completed })));
  };

  const value = {
    todos,
    filter,
    setFilter,
    removeTodo,
    updateTodo,
    countActive,
    allCompleted,
    newTodoInput,
    clearCompleted,
    handleSubmit,
    handleToggleAll,
    noCompleted,
    noTodos,
    todoTitle,
    setTodoTitle,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
