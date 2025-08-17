import { useEffect, useState } from 'react';
import { Todo } from '../Type/Todo';
import React from 'react';

type TodoListContextType = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoListContext = React.createContext<TodoListContextType>({
  todoList: [],
  setTodoList: () => {},
});

export const TodoListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todoList, setTodoList] = useState<Todo[] | []>(() => {
    const storedVal = localStorage.getItem('todos');

    return storedVal ? JSON.parse(storedVal) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        setTodoList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};
