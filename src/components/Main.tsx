import { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { DispatchContext, StateContext } from '../context/TodosContext';

export const Main = () => {
  const state = useContext(StateContext);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useContext(DispatchContext);

  const toggleCheckbox = () => {
    dispatch({
      type: 'toggleAll',
      payload: !isChecked,
    });

    setIsChecked(!isChecked);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      {state.todos.length > 0 && (
        <TodoList />
      )}
    </section>
  );
};
