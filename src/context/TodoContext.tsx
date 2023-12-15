import { createContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

type TodoContextType = {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (title: string) => void,
  deleteTodo: (todoId: number) => void,
  filterStatus: Status,
  setFilterStatus: (status: Status) => void;
  handleTodoCompleted: (todoId: number) => void;
};

type Props = {
  children: React.ReactNode,
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  filterStatus: Status.All,
  setFilterStatus: () => {},
  handleTodoCompleted: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [filterStatus, setFilterStatus] = useState(Status.All);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    if (title.trim()) {
      setTodos([
        ...todos, newTodo,
      ]);
    }
  };

  const handleTodoCompleted = (todoId: number) => {
    const updatedTodos = todos.map(currentTodo => (
      currentTodo.id === todoId
        ? { ...currentTodo, completed: !currentTodo.completed }
        : currentTodo
    ));

    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId: number) => {
    const updatedTodo = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodo);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        deleteTodo,
        filterStatus,
        setFilterStatus,
        handleTodoCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
