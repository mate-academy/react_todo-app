import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { Action, reducer } from './TodoReducer';
import { TodoFilters } from '../types/TodoFilter';

type TodoContextType = {
  dispatch: React.Dispatch<Action>;
  setTodoFilter: React.Dispatch<React.SetStateAction<TodoFilters>>;
  todoFilter: TodoFilters;
  todos: Todo[];
  uncompletedTodos: Todo[];
  completedTodos: Todo[];
  preparedTodos: Todo[];
  newTodoField: React.RefObject<HTMLInputElement>;
  editingTodo: Todo | null;
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  editingTodoElement: React.RefObject<HTMLInputElement>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext is not available');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [todoFilter, setTodoFilter] = useState(TodoFilters.all);
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );

  const editingTodoElement = useRef<HTMLInputElement>(null);
  const newTodoField = useRef<HTMLInputElement>(null);

  const uncompletedTodos = todos.filter(todo => todo.completed === false);
  const completedTodos = todos.filter(todo => todo.completed === true);
  const preparedTodos = todos.filter(todo => {
    switch (todoFilter) {
      case TodoFilters.active:
        return !todo.completed;

      case TodoFilters.completed:
        return todo.completed;

      default:
        return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    newTodoField.current?.focus();
  }, []);

  useEffect(() => {
    if (editingTodo) {
      editingTodoElement.current?.focus();
    }
  }, [editingTodo]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        dispatch,
        uncompletedTodos,
        newTodoField,
        todoFilter,
        setTodoFilter,
        preparedTodos,
        completedTodos,
        editingTodo,
        setEditingTodo,
        editingTodoElement,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
