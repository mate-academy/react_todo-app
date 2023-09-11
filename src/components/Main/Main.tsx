import { useContext } from 'react';
import { TodoList } from '../TodoList';
import { TodoContext } from '../../TodoContext';

type Props = {};

export const Main: React.FC<Props> = () => {
  const { state, toggleAllComplete } = useContext(TodoContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all hidden"
        data-cy="toggleAll"
        onClick={() => toggleAllComplete()}
      />
      <label
        className={state.length === 0 ? 'hidden' : ''}
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>

      <TodoList />
    </section>
  );
};
