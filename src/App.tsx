/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoAdd } from './component/TodoAdd/TodoAdd';
import { TodoList } from './component/TodoList/TodoList';
import { TodoFilters } from './component/TodosFIlter/TodoFilter';
import { StateContext } from './context/GlobalContext/GlobalContext';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoAdd />
        <TodoList />
        {todos.length > 0 && <TodoFilters />}
      </div>
    </div>
  );
};
