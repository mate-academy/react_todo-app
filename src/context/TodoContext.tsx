import { createContext, useEffect, useRef, useState } from 'react';
import { Status, Todo, TodoContextType } from '../types/types';

export const TodoContext = createContext<TodoContextType | null>(null);

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const save = (newValue: T) => {
    setValue(newValue);
  };

  return [value, save];
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [counterTodos, setCounterTodos] = useState(0);
  const [status, setStatus] = useState(Status.All);
  const [counterCompletedTodos, setCounterCompletedTodos] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const checkInputFocus = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    checkInputFocus();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (status === Status.Active) {
      return !todo.completed;
    }

    if (status === Status.Completed) {
      return todo.completed;
    }

    return todo;
  });

  useEffect(() => {
    const activeTodo = todos.filter(todo => !todo.completed).length;
    const completedTodos = todos.filter(todo => todo.completed).length;

    setCounterTodos(activeTodo);
    setCounterCompletedTodos(completedTodos);
  }, [todos]);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: +new Date(),
      ...data,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
    checkInputFocus();
  };

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo =>
      todo.id === selectedTodo.id ? selectedTodo : todo,
    );

    setTodos(newTodos);
    checkInputFocus();
  };

  const toggleAllTodo = () => {
    const hasNoCompletedTodos = todos.some(todo => !todo.completed);
    const newCompletionState = hasNoCompletedTodos ? true : false;
    const noCompleteTodos = todos.filter(todo => !todo.completed);

    if (noCompleteTodos) {
      setTodos(todos.map(todo => ({ ...todo, completed: newCompletionState })));
      checkInputFocus();
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
    checkInputFocus();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        setTodos,
        addTodo,
        toggleTodo,
        counterTodos,
        setStatus,
        status,
        counterCompletedTodos,
        toggleAllTodo,
        deleteTodo,
        clearCompleted,
        inputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
