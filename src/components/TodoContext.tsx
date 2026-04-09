import React from 'react';
import { Filter, FILTER_ALL } from '../types/Filter';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  editingTitle: string;
  setEditingTitle: React.Dispatch<React.SetStateAction<string>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  deleteTodo: (id: number) => void;
  shouldFocus: boolean;
  setShouldFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoContext = React.createContext<TodoContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const isTestEnv = process.env.NODE_ENV === 'test';

  const [todos, setTodos] = React.useState<Todo[]>(() => {
    if (isTestEnv) {
      return [];
    }

    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = React.useState<Filter>(FILTER_ALL);
  const [shouldFocus, setShouldFocus] = React.useState<boolean>(false);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [editingTitle, setEditingTitle] = React.useState<string>('');
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    setTimeout(() => {
      setShouldFocus(true);
    }, 0);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
        editingTitle,
        setEditingTitle,
        editingId,
        setEditingId,
        deleteTodo,
        shouldFocus,
        setShouldFocus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
