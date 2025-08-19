import React from 'react';
import { Todo } from '../Type/Todo';
import { useLocalStorage } from '../Hooks/useLocalStorage';

type TodoListContextType = {
  todoList: Todo[];
  setTodoList: (a: Todo[]) => void;
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
  const [todoList, setTodoList] = useLocalStorage<Todo[] | []>('todos', []);

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
