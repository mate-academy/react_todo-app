import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type Todos = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (todoId: number) => void;
  toggleTodo: (todoId: number) => void;
  renameTodo: (todoId: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  newTodoFieldRef: React.RefObject<HTMLInputElement>;
};

const TodoContext = createContext<Todos | null>(null);

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const newTodoFieldRef = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>(() => {
    const localData = localStorage.getItem('todos');

    if (localData) {
      return JSON.parse(localData);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(title: string) {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: +new Date(),
        title,
        userId: 1,
        completed: false,
      },
    ]);
  }

  function deleteTodo(todoId: number) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));

    setTimeout(() => {
      newTodoFieldRef.current?.focus();
    }, 0);
  }

  function toggleTodo(todoId: number) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function renameTodo(todoId: number, title: string) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, title } : todo,
      ),
    );
  }

  function clearCompleted() {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.completed === false),
    );

    setTimeout(() => {
      newTodoFieldRef.current?.focus();
    }, 0);
  }

  function toggleAll() {
    const isAllCompleted = todos.every(todo => todo.completed === true);

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.completed === isAllCompleted
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        renameTodo,
        clearCompleted,
        toggleAll,
        newTodoFieldRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
