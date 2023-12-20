import React, { useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { Todos } from './Todos';

export const Main = () => {
  const [labelClick, setLabelClick] = useState(1);
  const { dispatch } = React.useContext(TodosContext);
  const handleToggleAll = () => {
    setLabelClick(labelClick + 1);
    if (labelClick % 2 === 0) {
      dispatch({ type: 'MARK_ALL_AS_UNCOMPLETED' });
    } else {
      dispatch({ type: 'MARK_ALL_AS_COMPLETED' });
    }
  };

  return (
    <section className="main">
      <input
        onClick={handleToggleAll}
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as completed
      </label>
      <Todos />
    </section>
  );
};
