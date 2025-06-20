import React, {
  createContext,
  useEffect,
  useState,
  PropsWithChildren,
  useCallback,
} from 'react';
import { Todo } from './types/Todo';

type TodosContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
  updateTodoTitle: (id: number, title: string) => void;
  updateTodoStatus: (id: number, complete: boolean) => void;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodoTitle: () => {},
  updateTodoStatus: () => {},
});

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const todosData = localStorage.getItem('todos');

      return todosData ? JSON.parse(todosData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((todo: Todo) => {
    setTodos(prev => [...prev, todo]);
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodoTitle = useCallback((id: number, title: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  }, []);

  const updateTodoStatus = useCallback((id: number, complete: boolean) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: complete } : todo,
      ),
    );
  }, []);

  const value = {
    todos,
    addTodo,
    deleteTodo,
    updateTodoTitle,
    updateTodoStatus,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
