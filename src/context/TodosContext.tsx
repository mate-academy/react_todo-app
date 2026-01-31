import React, { createContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../api/todos';
import { FilterTodo } from '../types/Filter';

type TodosContextType = {
  todos: Todo[];
  filterTodo: FilterTodo;
  setFilterTodo: (filter: FilterTodo) => void;
  addTodo: (newTitle: string) => void;
  toggleAllTodo: () => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (todo: Todo) => void;
  editTodo: (id: number, newTitle: string) => void;
  clearCompleted: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
type Props = {
  children: React.ReactNode;
};
export const TodosContext = createContext<TodosContextType>({
  todos: [],
  filterTodo: FilterTodo.All,
  setFilterTodo: () => {},
  addTodo: () => {},
  toggleAllTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  clearCompleted: () => {},
  inputRef: { current: null },
});
const LOCAL_STORAGE_KEY = 'todos';
export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState(FilterTodo.All);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: string) => {
    if (!todo.trim()) return;

    const tempId = Date.now();
    const tempTodo = {
      id: tempId,
      userId: USER_ID,
      title: todo.trim(),
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, tempTodo]);
  };

  const toggleAllTodo = () => {
    const allCompleted =
      todos.length > 0 && todos.every(todo => todo.completed);
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        return {
          ...todo,
          completed: !allCompleted,
        };
      }),
    );
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (todo: Todo) => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
    inputRef.current?.focus();
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    inputRef.current?.focus();
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        filterTodo,
        setFilterTodo,
        addTodo,
        toggleAllTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
        inputRef,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
