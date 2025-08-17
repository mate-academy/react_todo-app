import React, { useContext, useState } from 'react';
import { TodoListContext } from './TodoListContext';

type TodoTitleContextType = {
  todoTitle: string;
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  handleTodoTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
  isCompleted: boolean;
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoTitleContext = React.createContext<TodoTitleContextType>({
  todoTitle: '',
  setTodoTitle: () => {},
  handleTodoTitle: () => {},
  addTodo: () => {},
  isCompleted: false,
  setIsCompleted: () => {},
});

export const TodoTitleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const { setTodoList } = useContext(TodoListContext);

  const handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;

    setTodoTitle(title);
  };

  const addTodo = () => {
    const newTodoItem = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodoList(prev => {
      const updated = [...prev, newTodoItem];

      localStorage.setItem('todos', JSON.stringify(updated));

      return updated;
    });
  };

  return (
    <TodoTitleContext.Provider
      value={{
        todoTitle,
        setTodoTitle,
        handleTodoTitle,
        addTodo,
        isCompleted,
        setIsCompleted,
      }}
    >
      {children}
    </TodoTitleContext.Provider>
  );
};
