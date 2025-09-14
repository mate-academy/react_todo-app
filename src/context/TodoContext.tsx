import { createContext, useEffect, useState } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: (todos: Todo[]) => void;
  completeAll: (todos: Todo[]) => void;
  editTodo: (id: number, newTitle: string) => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  toggleTodo: () => {},
  clearCompleted: () => {},
  completeAll: () => {},
  editTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
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
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    setTodos(updatedTodos);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const completeAll = (todoList: Todo[]) => {
    if (todoList.every(todo => todo.completed)) {
      setTodos(todoList.map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todoList.map(todo => ({ ...todo, completed: true })));
    }
  };

  const editTodo = (id: number, newTitle: string) => {
    if (newTitle.length === 0) {
      deleteTodo(id);

      return;
    }

    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo,
      ),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        completeAll,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
