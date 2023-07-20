import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Todo, TodoStatus } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface ProvidedValue {
  todos: Todo[],
  completedTodos: Todo[],
  activeTodos: number,
  selectedStatus: TodoStatus,
  addTodoToList: (todo: Todo) => void,
  toggleTodoComplete: (todoId: number) => void,
  deleteTodoFromList: (todoId: number) => void,
  toggleAllAsCompleted: () => void,
  handleSelectedStatus: (newStatus: TodoStatus) => void,
  handleDeleteCompleted: () => void,
  editTodoTitle: (todoId: number, newTitle: string) => void,
}

type Props = {
  children: React.ReactNode,
};

export const TodoContext = createContext({} as ProvidedValue);

export const TodoContextProvider = ({ children }: Props) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(TodoStatus.All);

  const addTodoToList = (newTodo: Todo) => {
    setTodos(prev => ([...prev, newTodo]));
  };

  const deleteTodoFromList = (todoId: number) => {
    setTodos(prev => prev.filter(({ id }) => id !== todoId));
  };

  const toggleTodoComplete = (todoId: number) => {
    setTodos(prevTodo => prevTodo.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const toggleAllAsCompleted = () => {
    const allCompleted = todos.every(({ completed }) => completed);

    if (allCompleted) {
      setTodos(prev => prev.map(todo => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos(prev => prev.map(todo => ({
        ...todo,
        completed: true,
      })));
    }
  };

  const handleSelectedStatus = (newStatus: TodoStatus) => {
    setSelectedStatus(newStatus);
  };

  const handleDeleteCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
    setCompletedTodos([]);
  };

  const editTodoTitle = (todoId: number, newTitle: string) => {
    if (newTitle) {
      setTodos(prev => prev.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return todo;
      }));
    } else {
      setTodos(prev => prev.filter(({ id }) => id !== todoId));
    }
  };

  const activeTodos = todos.reduce((acc, todo) => {
    if (!todo.completed) {
      return acc + 1;
    }

    return acc;
  }, 0);

  useEffect(() => {
    setCompletedTodos(todos.filter(({ completed }) => completed));
  }, [todos]);

  const providedValue = useMemo(() => ({
    todos,
    activeTodos,
    completedTodos,
    selectedStatus,
    addTodoToList,
    toggleTodoComplete,
    deleteTodoFromList,
    toggleAllAsCompleted,
    handleSelectedStatus,
    handleDeleteCompleted,
    editTodoTitle,
  }), [
    todos,
    activeTodos,
    completedTodos,
    selectedStatus,
  ]);

  return (
    <TodoContext.Provider value={providedValue}>
      {children}
    </TodoContext.Provider>
  );
};
