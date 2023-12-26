import React, { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { Todos } from './Todos';

export const Main = () => {
  const [labelClick, setLabelClick] = useState(0);
  const { state: { todos }, dispatch } = React.useContext(TodosContext);

  const handleToggleAll = () => {
    setLabelClick(labelClick + 1);
    dispatch({
      type: labelClick % 2
        ? 'MARK_ALL_AS_UNCOMPLETED' : 'MARK_ALL_AS_COMPLETED',
    });
  };

  return (
    todos.length > 0 ? (
      <section className="main">
        <input
          onClick={handleToggleAll}
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">
          Mark all as completed
        </label>
        <Todos />
      </section>
    ) : (
      <></>
    )
  );
};
