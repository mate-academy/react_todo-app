import React, { createContext } from 'react';

type Context = {
  setIsEmptyTitleErrorShown: React.Dispatch<React.SetStateAction<boolean>>,
  isEmptyTitleErrorShown: boolean,
};

export const ErrorContext = createContext<Context>({
  isEmptyTitleErrorShown: false,
  setIsEmptyTitleErrorShown: (): void => {},
});
