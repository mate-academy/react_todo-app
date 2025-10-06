/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todoService from './api/todos';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { ErrorNotifications } from './components/ErrorNotification';
import { Filter } from './types/Filter';
import { ErrorMessage } from './types/ErrorMessage';
import { TodosProvider, useTodosContext } from './contexts/TodosContext';
import { useErrorContext } from './contexts/ErrorContext';
import { AddProvider } from './contexts/AddContext';
import { UpdateProvider } from './contexts/UpdateContext';
import { DeleteProvider } from './contexts/DeleteContext';

export const App: React.FC = () => {
  const [IsLoadLoader, setIsLoadLoader] = useState(true);
  const [isAddLoader, setIsAddLoader] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  const { setTodos } = useTodosContext();
  const { setErrorMessage, setIsHiddenErrorMessage } = useErrorContext();

  const inputRef = useRef<HTMLInputElement>(null);

  function loadTodos() {
    setIsLoadLoader(true);

    todoService
      .getTodos()
      .then(todosApi => {
        setTodos(todosApi);
        setIsHiddenErrorMessage(true);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.loadTodosError);
        setIsHiddenErrorMessage(false);
      })
      .finally(() => setIsLoadLoader(false));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadTodos, []);

  if (!todoService.USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodosProvider>
      <AddProvider>
        <UpdateProvider>
          <DeleteProvider>
            <div className="todoapp">
              <h1 className="todoapp__title">todos</h1>

              <div className="todoapp__content">
                <Header
                  isAddLoader={isAddLoader}
                  onAddLoader={setIsAddLoader}
                  inputRef={inputRef}
                  IsLoadLoader={IsLoadLoader}
                />

                <Main IsLoadLoader={IsLoadLoader} filter={filter} />

                <Footer filter={filter} stateFilter={setFilter} />
              </div>
              <ErrorNotifications />
            </div>
          </DeleteProvider>
        </UpdateProvider>
      </AddProvider>
    </TodosProvider>
  );
};
