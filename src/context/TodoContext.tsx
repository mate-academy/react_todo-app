import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FilterType, Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  filter: FilterType;
  addTodo: (value: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  renameTodo: (value: string, id: number) => void;
  clearCompleted: () => void;
  toggleAll: (completed: boolean) => void;
  setFilter: (filter: FilterType) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const TodoContext = createContext<TodoContextType | null>(null);

//#region hooks
export function useTodos() {
  const context = useContext(TodoContext);

  if (context === null) {
    throw new Error('useTodos must be used within a TodoProvider');
  }

  return context;
}
//#endregion

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');

    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const inputRef = useRef<HTMLInputElement>(null);

  //#region function
  function addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  function deleteTodo(id: number) {
    const deletedTodos = todos.filter(todo => todo.id !== id);

    setTodos(deletedTodos);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function toggleTodo(id: number) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function renameTodo(value: string, id: number) {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, title: value } : todo)),
    );
  }

  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.completed));
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function toggleAll(completed: boolean) {
    setTodos(todos.map(todo => ({ ...todo, completed: completed })));
  }
  //#endregion

  //#region useEffects
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  //#endregion

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        deleteTodo,
        toggleTodo,
        renameTodo,
        clearCompleted,
        toggleAll,
        setFilter,
        inputRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
