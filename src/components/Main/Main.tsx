import { useState, useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { DispatchContext } from '../../TodosContext';

export const Main = () => {
  const dispatch = useContext(DispatchContext);
  const [checked, setChecked] = useState(false);
  const toggleAllTodos = (toggler: boolean) => {
    dispatch({ type: 'toggleAll', payload: toggler });

    setChecked(!checked);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={checked}
        onChange={() => toggleAllTodos(checked)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <TodoList />
    </section>
  );
};
