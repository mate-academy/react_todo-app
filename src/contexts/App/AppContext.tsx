import TodosContext from '../Todos/TodosContext';
import FilterContext from '../Filter/FilterContext';

import { PropsWithChildren } from 'react';
import ErrorsContext from '../Errors/ErrorsContext';

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <ErrorsContext.Provider>
      <TodosContext.Provider>
        <FilterContext.Provider>{children}</FilterContext.Provider>
      </TodosContext.Provider>
    </ErrorsContext.Provider>
  );
};
