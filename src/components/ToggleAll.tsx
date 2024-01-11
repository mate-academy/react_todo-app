import { useContext } from 'react';
import { TodosContext } from '../context/ToDoContext';

export const ToggleAll: React.FC = () => {
  const { toggleAll, todos } = useContext(TodosContext);

  return (
    <>
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}
    </>
  );
};
