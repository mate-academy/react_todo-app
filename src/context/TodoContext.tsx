import {
  useState, createContext, useMemo, useEffect,
} from 'react';
import { Todo } from '../interface/Todo';

export const TodoContext = createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const todosStorage = localStorage.getItem('todos');

    setTodos(JSON.parse(todosStorage || '[]') as Todo[]);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
