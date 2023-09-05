import { useContext } from 'react';
import { TodosContext } from './TodosContext';

export const ToggleAll = () => {
  const todosContext = useContext(TodosContext);
  const { handleToggleAll } = todosContext;

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
