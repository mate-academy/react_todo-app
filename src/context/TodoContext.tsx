import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Todo } from '../types/todo';

// інтерфейс для опису значень, які передає контекст
export interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

// робимо контекст із початковим значенням undefined
export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);

// провайдер для управління станом додатка
export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // створюємо стан для завдань
  const [todos, setTodos] = useState<Todo[]>([]);

  // фція додавання нового завдання
  const addTodo = (title: string) => {
    // робимо новий об'єкт завдання
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    // оновлюємо стан, додаючи нове завдання до масиву
    setTodos([...todos, newTodo]);
  };

  // фція зміни статусу виконання завдання
  const toggleTodo = (id: number) => {
    // мапимо масив завдань, змінюючи completed для завдання з відповідним id
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // фція видалення завдання
  const deleteTodo = (id: number) => {
    // фільтр список справ, залишаючи лише ті, чий id не збігається з видаленим
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// хук для зручного доступу до контексту
export const useTodo = () => {
  const context = useContext(TodoContext);

  // перевіряємо, чи контекст існує (тобто чи обгорнутий компонент у Provider)
  if (!context) {
    throw new Error('useTodo має використовуватися всередині TodoProvider');
  }

  return context;
};
