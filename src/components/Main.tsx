import { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { DispatchContext } from './TodosContext';

export const Main = () => {
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
        onClick={toggleCheckbox}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
