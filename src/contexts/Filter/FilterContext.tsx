import React, { PropsWithChildren, useContext, useState } from 'react';
import { Filter } from '../../enums';

type State = {
  filter: Filter;
};

type Contract = {
  setFilter: (filter: Filter) => void;
};

const StateContext = React.createContext<State | null>(null);
const ContractContext = React.createContext<Contract | null>(null);

const Provider = ({ children }: PropsWithChildren) => {
  const [filter, setFilter] = useState(Filter.All);

  const state: State = {
    filter,
  };

  const contract: Contract = {
    setFilter,
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
