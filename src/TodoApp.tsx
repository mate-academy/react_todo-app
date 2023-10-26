/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';

import { TodoHeader } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { TodoFooter } from './components/TodoFooter';

import { useTodosState } from './contexts/TodosContext';
import { Status } from './types/Status';

export const TodoApp: React.FC = () => {
  const todos = useTodosState();
  const [filterBy, setIsFilterBy] = useState(Status.All);

  return (
    <div className="todoapp">
      <TodoHeader />

      {todos.length > 0 && (
        <>
          <TodoMain filterBy={filterBy} />
          <TodoFooter setFiltering={setIsFilterBy} />
        </>
      )}
    </div>
  );
};
