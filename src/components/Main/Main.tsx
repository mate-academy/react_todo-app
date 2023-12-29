import { ChangeEvent, useContext } from 'react';
import { DispatchContext, StateContext } from '../../TodosContext';
import { ReducerType } from '../../types/enums/ReducerType';
import { TodoList } from '../TodoList/TodoList';

export const Main: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const handleInputToggleAllChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerType.ToggleAll,
      payload: event.target.checked,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every(todo => todo.completed)}
        onChange={handleInputToggleAllChange}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
