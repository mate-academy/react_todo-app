import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type ContextItems = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (todoId: number) => void,
};

export const TodosContext = React.createContext<ContextItems>({
  todos: [],
  addTodo: () => { },
  updateTodo: () => { },
  deleteTodo: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodo => [...prevTodo, newTodo]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currTodos => {
      const updTodos = [...currTodos];
      const index = updTodos.findIndex(todo => todo.id === updatedTodo.id);

      updTodos.splice(index, 1, updatedTodo);

      return updTodos;
    });
  };

  const deleteTodo = (todoId: number) => {
    setTodos(currTodo => currTodo.filter(todo => todo.id !== todoId));
  };

  return (
    <TodosContext.Provider value={{
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
