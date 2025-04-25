import { useEffect, useState } from 'react';
import { Todo } from '../type/Todo';
import { TodosContext } from './TodoContext';

type TodoProviderProps = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('jsonTodos');

    setTodos(storedTodos && JSON.parse(storedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem('jsonTodos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
