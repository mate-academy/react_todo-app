import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filterBy: FilterType;
  setFilterBy: React.Dispatch<React.SetStateAction<FilterType>>;
  updatedTodo: (todo: Todo, title: string) => void;
}

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  setTodos: () => {},
  filterBy: FilterType.All,
  setFilterBy: () => {},
  updatedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const updatedTodo = (updatingTodo: Todo, title: string) => {
    if (!title.trim()) {
      deleteTodo(updatingTodo.id);
    }

    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const index = newTodos.findIndex(todo => todo.id === updatingTodo.id);

      const newTodo = {
        id: updatingTodo.id,
        title: title.trim(),
        completed: updatingTodo.completed,
      };

      newTodos.splice(index, 1, newTodo);

      return newTodos;
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updatedTodo,
        setTodos,
        filterBy,
        setFilterBy,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
