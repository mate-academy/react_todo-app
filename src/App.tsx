import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Title } from './components/Title';
import { Content } from './components/Content/Content';
import { UserInfo } from './components/UserInfo';
import { ErrorNotification } from './components/ErrorNotification';
import { Error } from './types/Error';

export const App: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback((errorType: Error | null) => {
    setError(errorType);
  }, []);

  useEffect(() => {
    const onScreenTimer = setTimeout(() => setError(null), 3000);

    return () => clearTimeout(onScreenTimer);
  }, [error]);

  return (
    <div className="todoapp">
      <Title />

      <Content
        onError={handleError}
      />

      {!error && (
        <UserInfo />
      )}

      {error && (
        <ErrorNotification
          error={error}
          onError={handleError}
        />
      )}
    </div>
  );
};
