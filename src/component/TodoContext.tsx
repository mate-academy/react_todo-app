import { createContext, useContext, useState, useEffect } from 'react';
import { Todo } from '../type/Todo';
import { TodosContextType, TodoFilter } from '../type/TodosContexType';

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo = { id: +new Date(), title: title.trim(), completed: false };

    setTodos(prev => [...prev, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const removeTodo = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== id);

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const clearCompleted = () => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => !todo.completed);

      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(prevTodos => {
      if (!newTitle.trim()) {
        return prevTodos.filter(todo => todo.id !== id);
      }

      return prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo,
      );
    });
  };

  const toggleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: !allCompleted })),
    );
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        removeTodo,
        clearCompleted,
        updateTodoTitle,
        toggleAllTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};
//new
