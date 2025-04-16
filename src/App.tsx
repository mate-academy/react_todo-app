/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Filter, Todo } from './types/Todo';
import { Header } from './Components/Header';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { ErrorMessage } from './Components/ErrorMessage';
import { callbacks } from './localStorage/localStorage';
import { ContextProvider } from './Components/ContextProvider';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filter, setFilter] = useState(Filter.All);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTodos(callbacks.getTodos());
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);
      case Filter.Completed:
        return todos.filter(todo => todo.completed);
      case Filter.All:
      default:
        return todos;
    }
  }, [todos, filter]);

  const deleteTodo = useCallback(
    (todoId: number) => {
      setErrorMessage('');

      const updatedTodos = todos.filter(todo => todo.id !== todoId);

      setTodos(updatedTodos);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);

      return callbacks.setTodos(updatedTodos);
    },
    [todos],
  );

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }

    return undefined;
  }, [errorMessage]);

  return (
    <ContextProvider context={{ todos, setTodos, inputRef, setErrorMessage }}>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header />
          <TodoList filteredTodos={filteredTodos} deleteTodo={deleteTodo} />

          {todos.length > 0 && <Footer filter={filter} setFilter={setFilter} />}
        </div>
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </ContextProvider>
  );
};
