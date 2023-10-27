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

  const souldRenderList = Boolean(state.length);

  return (
    <div className="todoapp">
      <Header />

      {souldRenderList
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
