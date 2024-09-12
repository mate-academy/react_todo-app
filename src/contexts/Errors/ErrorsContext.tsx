import React, { PropsWithChildren, useContext, useState } from 'react';
import { ErrorMessage } from '../../types';

type State = {
  error: ErrorMessage | null;
};

type Contract = {
  raiseError: (error: ErrorMessage) => void;
  clearError: () => void;
};

const StateContext = React.createContext<State | null>(null);
const ContractContext = React.createContext<Contract | null>(null);

const Provider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState<ErrorMessage | null>(null);

  const state = {
    error,
  };

  const contract = {
    raiseError: (e: ErrorMessage) => {
      setError(e);

      setTimeout(() => setError(null), 3000);
    },
    clearError: () => setError(null),
  };

  return (
    <StateContext.Provider value={state}>
      <ContractContext.Provider value={contract}>
        {children}
      </ContractContext.Provider>
    </StateContext.Provider>
  );
};

export default {
  Provider,
  useState: () => useContext(StateContext) as State,
  useContract: () => useContext(ContractContext) as Contract,
};
