import { useContext, useEffect, useRef } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';
import { ErrorNotification } from '../ErrorNotification';

import { TodoContext } from '../../context/TodoContext';
import { AppContentProps } from '../../types/AppContentProps';

export const AppContent: React.FC<AppContentProps> = ({
  filterType,
  setFilterType,
}) => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoContext must be used within TodoProvider');
  const { todos, errorMessage, setErrorMessage } = context;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header inputRef={inputRef} />
        {todos.length > 0 && (
          <TodoList filterType={filterType} inputRef={inputRef} />
        )}
        {todos.length > 0 && (
          <Footer
            filterType={filterType}
            onFilterType={setFilterType}
            inputRef={inputRef}
          />
        )}
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </div>
  );
};
