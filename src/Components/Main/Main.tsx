import React, { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { DispatchContext, StateContext } from '../../Context/TodoContext';
import { ReducerType } from '../../Types/ReducerType';

export const Main: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    dispatch({
      type: ReducerType.ToggleAll,
      payload: checked,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every((todo) => todo.completed)}
        onChange={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
