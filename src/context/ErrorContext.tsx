import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

interface Props {
  children: React.ReactNode;
}

interface ErrorState {
  errorMessage: string;
  errorVisible: boolean;
  showError: (message: string) => void;
  hideError: () => void;
}

export const ErrorContext = React.createContext<ErrorState>({
  errorMessage: '',
  errorVisible: false,
  showError: () => {},
  hideError: () => {},
});

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showError = useCallback((message: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setErrorMessage(message);
    setErrorVisible(true);
    timeoutRef.current = setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  }, []);

  const hideError = () => {
    setErrorMessage('');
    setErrorVisible(false);
  };

  const value = useMemo(() => {
    return {
      errorMessage,
      errorVisible,
      showError,
      hideError,
    };
  }, [errorMessage, errorVisible, showError]);

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
