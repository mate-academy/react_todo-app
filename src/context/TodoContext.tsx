import { createContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (title: string) => void,
  deleteTodo: (todoId: number) => void,
  filterStatus: string,
  setFilterStatus: (status: string) => void;
};

type Props = {
  children: React.ReactNode,
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  filterStatus: 'all',
  setFilterStatus: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    if (title.trim()) {
      setTodos([
        ...todos, newTodo,
      ]);
    }
  };

  const deleteTodo = (todoId: number) => {
    const updatedTodo = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodo);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
