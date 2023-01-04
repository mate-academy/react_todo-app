import React, { useMemo, useState } from 'react';

type TextError = {
  textError: string;
  setTextError: (textError: string) => void;
};

export const ContextTextError = React.createContext<TextError>({
  textError: '',
  setTextError: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TextErrorProvider: React.FC<Props> = ({ children }) => {
  const [textError, setTextError] = useState('');

  const contextObj = useMemo(() => ({
    textError, setTextError,
  }), [textError, setTextError]);

  return (
    <ContextTextError.Provider value={contextObj}>
      {children}
    </ContextTextError.Provider>
  );
};
