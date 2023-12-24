import {
  createContext, ReactNode, useContext,
} from 'react';

interface MyContextProps {

}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export const useMyContext = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context;
};

export const MyContextProvider: React.FC<MyContextProviderProps>
= ({ children }) => {


  return (
    <MyContext.Provider value={{
    }}
    >
      {children}
    </MyContext.Provider>
  );
};
