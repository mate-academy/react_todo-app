import React, {
  useMemo,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { Todo } from '../types';
import { pickCompletedTodos } from '../utils/pickUncompletedTodos';

interface TodoContextType {
  todoItems: Todo[];
  setTodoItems: React.Dispatch<React.SetStateAction<Todo[]>>;
  deleteTodo: (id: number) => void;
  completedTodos: Todo[];
  clearAllCompleted: () => void;
  uncompletedTodosLength: number;
  handleTodoUpdate: (todo: Todo, todoTitle: string) => void;
  handleStatusChange: (todo: Todo) => void;
  setSingleStatusForAll: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  inputLine: React.LegacyRef<HTMLInputElement>;
}

const todoContext: TodoContextType = {
  todoItems: [],
  setTodoItems: () => { },
  deleteTodo: () => { },
  completedTodos: [],
  clearAllCompleted: () => { },
  uncompletedTodosLength: 0,
  handleTodoUpdate: () => { },
  handleStatusChange: () => { },
  setSingleStatusForAll: () => { },
  isLoading: false,
  setIsLoading: () => { },
  inputLine: null,
};

export const TodoContext = React.createContext(todoContext);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputLine = useRef<HTMLInputElement>(null);

  const deleteTodo = async (todoId: number) => {
    setIsLoading(true);

    await setTodoItems(currentTodos => currentTodos
      .filter(({ id }) => id !== todoId));

    setIsLoading(false);
  };

  const completedTodos = pickCompletedTodos(todoItems);

  const clearAllCompleted = () => completedTodos
    .map(({ id }) => deleteTodo(id));

  const uncompletedTodosLength = todoItems.length
    - completedTodos.length;

  const handleStatusChange = async (todo: Todo) => {
    const {
      id,
      title,
      completed,
    } = todo;

    setIsLoading(true);

    const updatedTodo = {
      id,
      title,
      completed: !completed,
    };

    await setTodoItems(prevTodos => prevTodos.map(prevTodo => (
      prevTodo.id !== updatedTodo.id
        ? prevTodo
        : updatedTodo
    )));

    setIsLoading(false);
  };

  const setSingleStatusForAll = () => {
    const uncompletedTodos = todoItems.filter(todo => !todo.completed);

    if (!uncompletedTodosLength) {
      todoItems.map(handleStatusChange);
    } else {
      uncompletedTodos.map(handleStatusChange);
    }
  };

  const handleTodoUpdate = async (todo: Todo, todoTitle: string) => {
    const {
      id,
      completed,
    } = todo;

    const updatedTodo = {
      id,
      title: todoTitle,
      completed,
    };

    setIsLoading(true);

    await setTodoItems(prevTodos => prevTodos.map(prevTodo => (
      prevTodo.id !== updatedTodo.id
        ? prevTodo
        : updatedTodo
    )));

    setIsLoading(false);
  };

  const value = useMemo(() => ({
    todoItems,
    setTodoItems,
    deleteTodo,
    completedTodos,
    clearAllCompleted,
    uncompletedTodosLength,
    handleTodoUpdate,
    handleStatusChange,
    setSingleStatusForAll,
    isLoading,
    setIsLoading,
    inputLine,
  }), [todoItems, inputLine, isLoading]);

  useEffect(() => {
    setTodoItems(JSON.parse(localStorage.getItem('todos') || '[]') as Todo[]);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoItems));
  }, [todoItems]);

  useEffect(() => {
    if (!isLoading) {
      inputLine.current?.focus();
    }
  }, [isLoading]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
