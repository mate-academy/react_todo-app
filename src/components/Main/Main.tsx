import { useContext } from 'react';
import { Context } from '../ContextProvider';
import { TodoList } from '../TodoList';

export const Main = () => {
  const { toggleAll } = useContext(Context);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
