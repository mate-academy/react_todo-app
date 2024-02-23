import React, { ReactNode, createContext, useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  data: Todo[] | [];
  setData: (newData: Todo[] | ((prevData: Todo[]) => Todo[])) => void;
  deleteTodo: (id: number) => void;
  updateCompleteTodo: (id: number) => void;
}

interface Props {
  children: ReactNode;
}

export const TodoContext = createContext<TodoContextType>({
  data: [],
  setData: () => {},
  deleteTodo: () => {},
  updateCompleteTodo: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<Todo[]>([]);

  const deleteTodo = (id: number) => {
    setData(prevData => prevData.filter(todo => todo.id !== id));
  };

  const updateCompleteTodo = (id: number) => {
    setData(prevData =>
      prevData.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <TodoContext.Provider
      value={{ data, setData, deleteTodo, updateCompleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
