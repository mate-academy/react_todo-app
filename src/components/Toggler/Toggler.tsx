import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';

export const Toggler: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    if (allCompleted) {
      dispatch({ type: 'TOGGLE_ALL_TODOS', payload: false });
    } else {
      dispatch({ type: 'TOGGLE_ALL_TODOS', payload: true });
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={toggleAll}
      />

      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
    </>
  );
};
