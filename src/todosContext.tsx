import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { NewTodo } from './types/NewTodo';

type Props = {
  children: React.ReactNode;
};

interface TodosContextType {
  todos: Todo[];
  addTodo: (todo: NewTodo) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (td: Todo) => void;
  deleteAllCompleted: (ids: number[]) => void;
  handleToggling: () => void;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  deleteAllCompleted: () => {},
  handleToggling: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });

  const USER_ID = 3595;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: NewTodo) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: todo.title.trim(),
      completed: todo.completed,
      userId: USER_ID,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const updateTodo = (td: Todo) => {
    setTodos(prev => prev.map(t => (t.id === td.id ? td : t)));
  };

  const deleteAllCompleted = (ids: number[]) => {
    setTodos(prev => prev.filter(t => !ids.includes(t.id)));
  };

  const handleToggling = () => {
    const allCompleted = todos.every(t => t.completed);

    setTodos(prev => prev.map(t => ({ ...t, completed: !allCompleted })));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        deleteAllCompleted,
        handleToggling,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
