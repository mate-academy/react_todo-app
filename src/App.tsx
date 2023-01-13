import { useState } from 'react';
import { TodoContent } from './components/TodoContent';
import { ErrorNotification } from './components/ErrorNotification';
import { ErrorContext } from './context/ErrorContext';

export const App: React.FC = () => {
  const [isEmptyTitleErrorShown, setIsEmptyTitleErrorShown] = useState(false);

  const errorObject = {
    isEmptyTitleErrorShown,
    setIsEmptyTitleErrorShown,
  };

  return (
    <ErrorContext.Provider
      value={errorObject}
    >
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>
        <TodoContent />
        <ErrorNotification />
      </div>
    </ErrorContext.Provider>
  );
};
