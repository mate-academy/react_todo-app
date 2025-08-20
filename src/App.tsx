/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoContext } from './components/GlobalContext/GlobalContext';
import { FilterType } from './type/FilterType';

export const App: React.FC = () => {
  const todos = useContext(TodoContext);
  const [filter, setFilter] = useState<FilterType>(FilterType.all);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList filterValue={filter} />

        {todos.length !== 0 && (
          <TodoFooter
            filterValue={filter}
            setFilter={(value: FilterType) => setFilter(value)}
          />
        )}
      </div>
    </div>
  );
};
