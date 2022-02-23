import React, {
  useState, useCallback, useEffect,
} from 'react';
import { ContextValue } from './types/ContextValue';
import { Todo } from './types/Todo';

export const TodosContext = React.createContext<ContextValue | null>(null);

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toggleAll, setToggleAll] = useState<string>('');

  useEffect(() => {
    if (localStorage.todos) {
      setTodos(JSON.parse(localStorage.todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setTodos((currentTodos: Todo[]) => {
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

      return result;
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
    setTodos((currentTodos: Todo[]) => {
      return [...currentTodos,
        {
          id: `${currentTodos.length - 1}`,
          title,
          completed: false,
        }];
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.filter((todo: Todo) => todo.id !== id);
    });
  }, []);

  const checkedTodo = useCallback((id: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      });
    });
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((currentTodos: Todo[]) => {
      const result = currentTodos.filter((todo: Todo) => !todo.completed);

      return result;
    });
  }, []);

  const onChangeTodo = useCallback((id: string, title: string) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map((todo: Todo) => {
        return todo.id === id ? { ...todo, title } : todo;
      });
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
