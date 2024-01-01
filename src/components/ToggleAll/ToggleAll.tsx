import { ChangeEvent, useContext } from 'react';
import { DispatchContext, StateContext } from '../../state/TodosContext';
import { ReducerType } from '../../types';

export const ToggleAll: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerType.ToggleAll,
      payload: event.target.checked,
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every(todo => todo.completed)}
        onChange={handleToggleChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
