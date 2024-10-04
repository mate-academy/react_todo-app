import { createContext, useContext, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoContextProps = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodoStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
};

type TodoProviderProps = React.PropsWithChildren<{}>;

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const toggleTodoStatus = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const value = {
    todos,
    addTodo,
    toggleTodoStatus,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
