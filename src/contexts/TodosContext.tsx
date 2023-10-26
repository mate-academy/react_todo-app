import { createContext, useState } from 'react';
import { Todo } from '../types/Todo';

type DefaultValueType = [todos: Todo[], setTodos:(todosToSet: Todo[]) => void];

export const TodosContext = createContext<DefaultValueType>([[], () => {}]);

function useLocalStorage(key: string, initialTodos: Todo[]) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedData = localStorage.getItem(key);

      return storedData ? JSON.parse(storedData) : initialTodos;
    } catch (e) {
      return initialTodos;
    }
  });

  const save = (todosToSet: Todo[]) => {
    setTodos(todosToSet);
    localStorage.setItem(key, JSON.stringify(todosToSet));
  };

  return [todos, save] as [Todo[], (todosToSet: Todo[]) => void];
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      {children}
    </TodosContext.Provider>
  );
};
