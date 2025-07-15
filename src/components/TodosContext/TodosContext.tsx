import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';

type TodosContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(data => {
      const newData = data.map(todo => ({ ...todo, isLoaded: true }));

      setTodos(newData);
    });
  }, []);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
