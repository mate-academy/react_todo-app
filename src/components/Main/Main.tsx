import { ChangeEvent, useContext } from 'react';
// eslint-disable-next-line import/extensions
import { DispatchContext, TodosContext } from '../../state/State';
import './Main.scss';
import { TodoList } from '../TodoList/TodoList';

export const Main = () => {
  const dispatch = useContext(DispatchContext);
  const { toggleAll, todos } = useContext(TodosContext);

  const handleToggleAll = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'toggleAll', payload: event.target.checked });
  };

  return (
    <main className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="main__toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
      />

      <label
        htmlFor="toggle-all"
        className="main__label"
        style={{
          transform: `rotate(${toggleAll ? 0 : 90}deg)`,
          opacity: toggleAll ? 1 : 0.4,
          display: todos.length ? 'block' : 'none',
        }}
      >
        Mark all as complete
      </label>

      <TodoList />
    </main>
  );
};
