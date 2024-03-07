import React, { useCallback, useState } from 'react';
import { TodosProvider } from './services/TodosContext';
import { TodoApp } from './components/TodoApp';
import { TodosFilter } from './components/TodosFilter';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [status, setStatus] = useState<Status>(Status.all);

  const selectStatus = useCallback(
    (newStatus: Status): void => setStatus(newStatus),
    [],
  );

  return (
    <div className="todoapp">
      <TodosProvider>
        <TodoApp status={status} />
        <TodosFilter
          data-cy="todosFilter"
          status={status}
          selectStatus={selectStatus}
        />
      </TodosProvider>
    </div>
  );
};
