import React, { useCallback, useState } from 'react';

import { ErrorNotification } from './components/ErrorNotification';
import { TodoApp } from './components/TodoApp';

import { AuthProvider } from './contexts/AuthContext';

import { ErrorType } from './enums/ErrorType';

export const App: React.FC = () => {
  const [errorType, setErrorType] = useState(ErrorType.None);

  const hasError = errorType !== ErrorType.None;

  const handleShowError = useCallback((error: ErrorType) => {
    setErrorType(error);
  }, []);

  const handleHideError = useCallback(() => {
    setErrorType(ErrorType.None);
  }, []);

  return (
    <>
      <AuthProvider
        hasError={hasError}
        showError={setErrorType}
        hideError={handleHideError}
      >
        <TodoApp
          showError={handleShowError}
          hideError={handleHideError}
        />
      </AuthProvider>

      <ErrorNotification
        errorType={errorType}
        onCloseNotification={handleHideError}
      />
    </>
  );
};
