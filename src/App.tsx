/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext } from 'react';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodosFilter';
import { Header } from './components/Header';
import { Status } from './types/enums/Status';
import { TodosContext } from './store/store';

export const App: React.FC = () => {
  const [filterParam, setFilterParam] = useState<Status>(Status.All);
  const { state } = useContext(TodosContext);

  const handleSetFilterParam = (param: Status) => {
    setFilterParam(param);
  };

  return (
    <div className="todoapp">
      <Header />

      {state.length > 0
        && (
          <>
            <section className="main">
              <TodoList filterParam={filterParam} />
            </section>

            <TodoFilter
              handleSetFilterParam={handleSetFilterParam}
              filterParam={filterParam}
            />
          </>
        )}
    </div>
  );
};
