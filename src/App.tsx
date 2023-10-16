/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { StateTodo } from './context';
import { Status } from './types';
import {
  TodoFilter,
  TodoForm,
  TodoToggle,
  TodoList,
} from './components';
import { Notification } from './components/Notification';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { todos } = useContext(StateTodo);
  const location = useLocation();

  const filteredTodos = useMemo(() => todos.filter(todo => {
    const pathName = location.pathname;

    switch (pathName) {
      case Status.ACTIVE:
        return !todo.completed;

      case Status.COMPLETED:
        return todo.completed;

      default:
        return true;
    }
  }), [todos, location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorMessage]);

  return (
    <div>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoForm setErrorMessage={setErrorMessage} />
        </header>

        <section className="main">
          <TodoToggle />

          <TodoList todos={filteredTodos} />
        </section>

        {!!todos.length && (
          <TodoFilter location={location} />
        )}
      </div>

      {errorMessage && (
        <Notification
          deleteError={setErrorMessage}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
