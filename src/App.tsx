/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Route, Routes } from 'react-router-dom';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ContextTextError } from './components/Context/ContextTextError';
import { ContextTodos } from './components/Context/ContextTodos';
import { ErrorNotifications } from './components/ErrorNotifications';
import { HeaderForm } from './components/HeaderForm';
import { TodoFilter } from './components/TodosFilter';
import { ErrorType } from './types/ErrorType';

export const App: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { textError, setTextError } = useContext(ContextTextError);
  const { todos, setTodos, isAddingTodo } = useContext(ContextTodos);
  const { setUser } = useContext(AuthContext);

  const userId = user?.id || 0;
  const unCompletedTodos = useMemo(() => {
    return [...todos].filter(todo => !todo.completed);
  }, [todos]);
  const completedTodos = useMemo(() => {
    return [...todos].filter(todo => todo.completed);
  }, [todos]);

  const [isLoadingTodos, setIsLoadingTodos] = useState(false);

  const loaderTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos(userId);

      setTodos(todosFromServer);
    } catch {
      setTextError(ErrorType.GET);
    } finally {
      setIsLoadingTodos(false);
    }
  }, [userId]);

  useEffect(() => {
    setIsLoadingTodos(true);
    loaderTodos();
  }, []);

  return (
    <div className="todoapp">
      <div className="todoapp__log-out">
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-user is-small" />
          </span>
          <span>{`Hello, ${user?.name}`}</span>
        </span>
        <button
          type="button"
          className="button is-outlined is-rounded"
          onClick={() => {
            localStorage.clear();
            setUser(null);
          }}
        >
          Log out
        </button>
      </div>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderForm
          unCompletedTodos={unCompletedTodos}
          loaderTodos={loaderTodos}
        />

        {isLoadingTodos && (
          <div className="todoapp__loader">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#af2f2f75"
              ariaLabel="three-dots-loading"
              visible
            />
          </div>
        )}

        {(todos?.length || isAddingTodo) && (
          <Routes>
            <Route
              path="/"
              element={(
                <TodoFilter
                  unCompletedTodos={unCompletedTodos}
                  completedTodos={completedTodos}
                />
              )}
            />

            <Route
              path="/:filter"
              element={(
                <TodoFilter
                  unCompletedTodos={unCompletedTodos}
                  completedTodos={completedTodos}
                />
              )}
            />
          </Routes>

        )}
      </div>

      {textError && (
        <ErrorNotifications />
      )}
    </div>
  );
};
