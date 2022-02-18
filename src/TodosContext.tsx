import React, {
  useState, useCallback, useEffect,
} from 'react';
import { ContextValue } from './types/ContextValue';
import { Todo } from './types/Todo';

export const TodosContext = React.createContext<ContextValue | null>(null);

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | null>(JSON.parse(localStorage.todos) || null);
  const [toggleAll, setToggleAll] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setTodos((currentTodos: Todo[] | null) => {
      const result = currentTodos?.map((todo: Todo) => {
        switch (toggleAll) {
          case 'allCompleted':
            return { ...todo, completed: true };
          case 'allActive':
            return { ...todo, completed: false };
          default:
            return { ...todo };
        }
      });

      return result || null;
    });
  }, [toggleAll]);

  useEffect(() => {
    setToggleAll(() => {
      switch (true) {
        case todos?.every((todo) => !todo.completed):
          return 'allActive';

        case todos?.every((todo) => todo.completed):
          return 'allCompleted';

        default:
          return '';
      }
    });
  }, [todos]);

  const handlerToggleAll = useCallback(() => {
    setToggleAll((currentValue: string) => {
      let state: string;

      switch (currentValue) {
        case 'allCompleted':
          state = 'allActive';
          break;
        case 'allActive':
          state = 'allCompleted';
          break;
        default:
          state = 'allCompleted';
      }

      return state;
    });
  }, []);

  const addTodo = useCallback((title: string) => {
    const todo = {
      id: `${new Date()}`,
      title,
      completed: false,
    };

    setTodos((currentTodos: Todo[] | null) => {
      return currentTodos !== null ? [...currentTodos, todo] : [todo];
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((currentTodos: Todo[] | null) => {
      const result = currentTodos?.filter((todo: Todo) => todo.id !== id);

      return result || null;
    });
  }, []);

  const checkedTodo = useCallback((id: string) => {
    setTodos((currentTodos: Todo[] | null) => {
      const result = currentTodos?.map((todo: Todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      });

      return result || null;
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((currentTodos: Todo[] | null) => {
      const result = currentTodos?.filter((todo: Todo) => !todo.completed);

      return result || null;
    });
  }, []);

  const onChangeTodo = useCallback((id: string, title: string) => {
    setTodos((currentTodos: Todo[] | null) => {
      const result = currentTodos?.map((todo: Todo) => {
        return todo.id === id ? { ...todo, title } : todo;
      });

      return result || null;
    });
  }, []);

  const validationTitle = useCallback((title: string) => {
    const correctedTitle = title.replace(/[^a-zа-яё0-9\s]/gi, ' ').replace(/\s+/g, ' ');

    return correctedTitle;
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        toggleAll,
        setTodos,
        handlerToggleAll,
        onChangeTodo,
        validationTitle,
        addTodo,
        deleteTodo,
        checkedTodo,
        clearCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>

  );
};
