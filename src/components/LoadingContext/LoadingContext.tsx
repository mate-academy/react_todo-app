import { ReactNode, createContext, useState } from 'react';

type LoadingProviderProps = {
  children?: ReactNode;
};

export const LoadingContext = createContext<{
  isLoadingAll: boolean;
  setIsLoadingAll: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isLoadingAll: false,
  setIsLoadingAll: () => {},
});

// eslint-disable-next-line max-len
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  const loadingValue = {
    isLoadingAll,
    setIsLoadingAll,
  };

  return (
    <LoadingContext.Provider value={loadingValue}>
      {children}
    </LoadingContext.Provider>
  );
};
