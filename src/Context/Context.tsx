import { createContext, useRef, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type UpdateTodo = {
  id: number;
  oldTitle: string;
  newTitle: string;
};

type TodosContext = {
  focusNewTodoField: () => void;
  updateTodo: ({ id, oldTitle, newTitle }: UpdateTodo) => void;
  visibleTodos: Todo[];
  todos: Todo[];
  addTodo: (v: string) => void;
  deleteTodo: (n: number) => void;
  todoStatus: (id: number) => void;
  allCompleted: boolean;
  toggleAll: () => void;
  clearTodos: () => void;
  handleStatusChange: (str: FilterStatus) => void;
  todosStatus: FilterStatus;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
};

type Props = {
  children: React.ReactNode;
};

type FilterStatus = 'All' | 'Completed' | 'Active';

export const TodoContext = createContext<TodosContext>({
  visibleTodos: [],
  updateTodo: () => {},
  focusNewTodoField: () => {},
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  todoStatus: () => {},
  allCompleted: false,
  toggleAll: () => {},
  clearTodos: () => {},
  handleStatusChange: () => {},
  todosStatus: 'All',
  inputRef: { current: null },
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todosStatus, setTodosStatus] = useState<FilterStatus>('All');
  const inputRef = useRef<HTMLInputElement | null>(null);

  // #regionFunctions
  const allCompleted = todos.every(todo => todo.completed);
  const focusNewTodoField = () => {
    inputRef.current?.focus();
  };

  const toggleAll = () => {
    const newTodosArr = todos.map(todo => {
      return {
        ...todo,
        completed: !allCompleted,
      };
    });

    setTodos(newTodosArr);
  };

  const handleStatusChange = (v: FilterStatus) => {
    setTodosStatus(v);
  };

  let visibleTodos = todos;

  switch (todosStatus) {
    case 'Completed':
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    case 'Active':
      visibleTodos = todos.filter(todo => !todo.completed);
      break;

    case 'All':
    default:
      visibleTodos = todos;
  }

  const addTodo = (title: string) => {
    const newTitle = title.trim();

    if (newTitle.length < 1) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: newTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);

    setTodos(newTodos);
  };

  const clearTodos = () => {
    const withOutCompletedTodods = todos.filter(todo => !todo.completed);

    setTodos(withOutCompletedTodods);
  };

  const updateTodo = ({ id, oldTitle, newTitle }: UpdateTodo) => {
    const title = newTitle.trim();

    if (title.length === 0) {
      deleteTodo(id);

      return;
    }

    if (title === oldTitle) {
      return;
    }

    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const todoStatus = (id: number) => {
    const newTodos = todos.map(tod => {
      if (tod.id === id) {
        return {
          ...tod,
          completed: !tod.completed,
        };
      }

      return tod;
    });

    setTodos(newTodos);
  };
  // #endregion

  return (
    <TodoContext.Provider
      value={{
        updateTodo,
        focusNewTodoField,
        inputRef,
        visibleTodos,
        todosStatus,
        todos,
        toggleAll,
        addTodo,
        deleteTodo,
        todoStatus,
        allCompleted,
        clearTodos,
        handleStatusChange,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
