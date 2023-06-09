import { ReactNode, createContext, useState } from 'react';

type LoadingProviderProps = {
  children?: ReactNode;
};

export const LoadingContext = createContext<{
  isLoadingAll: boolean;
  setIsLoadingAll: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoadingAll: false,
  setIsLoadingAll: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

// eslint-disable-next-line max-len
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadingValueAll = {
    isLoadingAll,
    setIsLoadingAll,
  };

  const loadingValue = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={{ ...loadingValueAll, ...loadingValue }}>
      {children}
    </LoadingContext.Provider>
  );
};
