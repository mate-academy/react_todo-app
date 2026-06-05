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
  const [todoFilter, setTodoFilter] = useState(TodoFilters.all);
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );

  const newTodoField = useRef<HTMLInputElement>(null);

  const uncompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
