/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoContent } from './components/TodoContent/TodoContent';
import { TodoProvider } from './Context/TodoContext';
import { FilterProvider } from './Context/FilterContext';

export const App: React.FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">ToDos</h1>
      <TodoProvider>
        <FilterProvider>
          <TodoContent />
        </FilterProvider>
      </TodoProvider>
    </div>
  );
};
