import React from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todoTitle: string;
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
  filteredTodos: Todo[];
  setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  handleToggleAll: () => void;
  handleTodoSubmission: (event: React.FormEvent<HTMLFormElement>) => void;
  handleTodoToggle: (id: number) => void;
  handleClearActiveTodos: () => void;
  handleDeleteTodo: (id: number) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  todoTitle: '',
  filterBy: 'all',
  setFilterBy: () => {},
  filteredTodos: [],
  setTodoTitle: () => {},
  handleToggleAll: () => {},
  handleClearActiveTodos: () => {},
  handleTodoSubmission: () => {},
  handleTodoToggle: () => {},
  handleDeleteTodo: () => {},
});

const initialTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  if (storedTodos) {
    return JSON.parse(storedTodos);
  }

  return [];
};

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos());
  const [todoTitle, setTodoTitle] = React.useState<string>('');
  const [filterBy, setFilterBy] = React.useState<string>('all');

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = React.useMemo(() => {
    switch (filterBy) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);

  const handleTodoSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoTitle('');
  };

  const handleToggleAll = () => {
    setTodos(prevTodos => {
      const completed = !prevTodos.every(todo => todo.completed);

      return prevTodos.map(todo => ({ ...todo, completed }));
    });
  };

  const handleTodoToggle = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleClearActiveTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const contextValue = {
    todos,
    setTodos,
    filterBy,
    setFilterBy,
    filteredTodos,
    todoTitle,
    setTodoTitle,
    handleToggleAll,
    handleTodoSubmission,
    handleTodoToggle,
    handleClearActiveTodos,
    handleDeleteTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
