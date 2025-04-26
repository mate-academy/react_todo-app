import { useEffect, useState } from 'react';
import { Todo } from '../type/Todo';
import { TodosContext } from './TodoContext';

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      localStorage.setItem('todos', JSON.stringify([]));
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
