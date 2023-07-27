import { useContext } from 'react';
import { TodoListComponent } from '../TodoListComponent';
import { AppContext } from '../../context';
import { Types } from '../../reducer';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const MainComponent = () => {
  const { state, dispatch } = useContext(AppContext);

  const isSelectedAll = ((): boolean => {
    if (!state.todos.length) {
      return false;
    }

    return state.todos.every(el => el.completed);
  })();

  return (
    <section className="main">
      <input
        type="checkbox"
        defaultChecked={isSelectedAll}
        id="toggle-all"
        onClick={() => {
          dispatch({
            type: Types.ToggleSelectAll,
            payload: {
              isSelectedAll,
            },
          });
        }}
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoListComponent />
    </section>
  );
};
