import { createContext, useState, useEffect, useContext } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (title: string) => void;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  clearCompleted: () => void;
  updateTodoData: (todoId: number, newData: Partial<Todo>) => void;
  handleMarkAllCompleted: () => void;
  deleteTodos: (ids: number[]) => void;
};

export const TodosContext = createContext<TodosContextType | undefined>(
  undefined,
);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newID = +new Date();

    const newTodo: Todo = {
      id: newID,
      title: title,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('todos');

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setTodos(parsed);
        }
      }
    } catch {
      //нічого не робимо
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState<Filter>('all');

  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
  }

  function updateTodoData(todoId: number, newData: Partial<Todo>) {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, ...newData } : todo,
      ),
    );
  }

  function handleMarkAllCompleted() {
    const allCompleted = todos.every(todo => todo.completed);
    const newStatus = !allCompleted;

    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: newStatus })),
    );
  }

  function deleteTodos(ids: number[]) {
    setTodos(todos.filter(todo => !ids.includes(todo.id)));
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        filter,
        setFilter,
        clearCompleted,
        updateTodoData,
        handleMarkAllCompleted,
        deleteTodos,
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
