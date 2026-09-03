import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Todo } from '../Types/Todo';
import { Actions, FilterStatus } from '../Types/types';

const localStorageKey = 'todos';

type Action =
  | { type: Actions.SetTodos; payload: Todo[] }
  | { type: Actions.AddTodo; payload: Todo }
  | { type: Actions.UpdateTodo; payload: { id: number; data: Partial<Todo> } }
  | { type: Actions.DeleteTodo; payload: number }
  | { type: Actions.ToggleAllTodos; payload: boolean }
  | { type: Actions.ClearCompleted };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case Actions.SetTodos:
      return action.payload;
    case Actions.AddTodo:
      return [...state, action.payload];
    case Actions.UpdateTodo:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.data }
          : todo,
      );
    case Actions.DeleteTodo:
      return state.filter(todo => todo.id !== action.payload);
    case Actions.ToggleAllTodos:
      return state.map(todo => ({ ...todo, completed: action.payload }));
    case Actions.ClearCompleted:
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

interface TodoContextType {
  todos: Todo[];
  filterStatus: FilterStatus;
  isProcessing: boolean;
  setFilterStatus: (status: FilterStatus) => void;
  addTodos: (title: string) => void;
  deleteTodo: (id: number) => void;
  handleUpdateTodo: (id: number, data: Partial<Todo>) => void;
  toggleAllTodos: () => void;
  clearCompleted: () => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.All,
  );

  useEffect(() => {
    const storedTodos = localStorage.getItem(localStorageKey);

    if (storedTodos) {
      dispatch({ type: Actions.SetTodos, payload: JSON.parse(storedTodos) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  function addTodos(title: string) {
    const trimmedTitle = title.trim();

    if (trimmedTitle === '') {
      return;
    }

    const newTodo: Todo = {
      id: new Date().getTime(),
      title: trimmedTitle,
      completed: false,
    };

    dispatch({ type: Actions.AddTodo, payload: newTodo });
  }

  function deleteTodo(id: number) {
    dispatch({ type: Actions.DeleteTodo, payload: id });
  }

  function handleUpdateTodo(id: number, data: Partial<Todo>) {
    dispatch({ type: Actions.UpdateTodo, payload: { id: id, data } });
  }

  function toggleAllTodos() {
    const allCompleted = !(
      todos.length > 0 && todos.every(todo => todo.completed)
    );

    dispatch({ type: Actions.ToggleAllTodos, payload: allCompleted });
  }

  function clearCompleted() {
    dispatch({ type: Actions.ClearCompleted });
  }

  const value: TodoContextType = {
    todos,
    filterStatus,
    isProcessing: false,
    setFilterStatus,
    addTodos,
    deleteTodo,
    handleUpdateTodo,
    toggleAllTodos,
    clearCompleted,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }

  return context;
}
