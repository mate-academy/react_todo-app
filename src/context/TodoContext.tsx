import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Todo, TodoContextType } from '../types/todo.types';
import { StatusEnum } from '../types/status.types';

const getTodos = (): Todo[] | [] => {
  const savedTodos = localStorage.getItem('todos');

  return savedTodos ? JSON.parse(savedTodos) : [];
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

type TodoProviderProps = {
  children: ReactNode;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filter, setFilter] = useState<StatusEnum>(StatusEnum.All);

  useEffect(() => {
    switch (filter) {
      case StatusEnum.All:
        setVisibleTodos(todos);
        break;
      case StatusEnum.Active:
        setVisibleTodos(todos.filter((item) => !item.completed));
        break;
      case StatusEnum.Completed:
        setVisibleTodos(todos.filter((item) => item.completed));
        break;
      default:
    }
  }, [filter, todos]);

  const addTodosToLocalStorage = (todosToSave: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todosToSave));
  };

  const saveTodos = (todosToSave: Todo[]) => {
    setTodos(todosToSave);
    addTodosToLocalStorage(todosToSave);
  };

  const addTodo = (todo: Todo) => {
    const newTodos = [...todos, todo];

    saveTodos(newTodos);
  };

  const changeTodoStatus = (id: number, status: boolean) => {
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: status,
        };
      }

      return item;
    });

    saveTodos(newTodos);
  };

  const toggleAllStatus = () => {
    const isActive = todos.map((item) => item.completed).includes(false);

    const newTodos = todos.map((item) => {
      return {
        ...item,
        completed: isActive,
      };
    });

    saveTodos(newTodos);
  };

  const removeTodo = (id: number) => {
    const newTodos = todos.filter((item) => item.id !== id);

    saveTodos(newTodos);
  };

  const removeAllCompleted = () => {
    const newTodos = todos.filter((item) => !item.completed);

    saveTodos(newTodos);
  };

  const editTodo = (id: number, value: string) => {
    if (!value) {
      removeTodo(id);
    } else {
      const newTodos = todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: value,
          };
        }

        return item;
      });

      saveTodos(newTodos);
    }
  };

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      removeTodo,
      editTodo,
      changeTodoStatus,
      toggleAllStatus,
      removeAllCompleted,
      setFilter,
      visibleTodos,
      filter,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodo() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
}
