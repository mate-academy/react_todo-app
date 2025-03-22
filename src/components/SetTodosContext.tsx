import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useRef,
} from 'react';
import { Todo } from '../types/Todo';
import { TodosContextType } from '../types/TodoContextType';
import { TypeFilter } from '../types/TypeFilter';

export const TodoContext = createContext<TodosContextType | undefined>(
  undefined,
);

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodo = localStorage.getItem('todos');

    return savedTodo ? JSON.parse(savedTodo) : [];
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [filter, setFilter] = useState('All');

  const removeTodo = (todoId: number) => {
    setTodos((current: Todo[]) => current.filter(t => t.id !== todoId));
    inputRef.current?.focus();
  };

  const clearAllCompletedTodo = () => {
    setTodos((current: Todo[]) => current.filter(t => !t.completed));

    inputRef.current?.focus();
  };

  const todoToggle = (changesTodo: Todo) => {
    const { id } = changesTodo;

    setTodos((current: Todo[]) =>
      current.map(todo => (todo.id === id ? { ...changesTodo } : todo)),
    );

    inputRef.current?.focus();
  };

  const toggleAllButton = (hasCompletedTodo: boolean) => {
    const previosTodoList = hasCompletedTodo
      ? todos.filter(todo => !todo.completed)
      : [...todos];

    const updatedTodolist = previosTodoList.map(todo => ({
      ...todo,
      completed: hasCompletedTodo,
    }));

    updatedTodolist.map(todoToggle);
  };

  const filteredTodos: Todo[] = useMemo(() => {
    const resultTodos = todos;

    switch (filter) {
      case TypeFilter.Active:
        return resultTodos.filter(t => !t.completed);

      case TypeFilter.Completed:
        return resultTodos.filter(t => t.completed);

      default:
        return resultTodos;
    }
  }, [filter, todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value: TodosContextType = {
    todos,
    filteredTodos,
    setTodos,
    removeTodo,
    setFilter,
    filter,
    inputRef,
    clearAllCompletedTodo,
    todoToggle,
    toggleAllButton,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
