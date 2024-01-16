import { useTodos } from './TodosContext';

export const ToggleAll = () => {
  const { handleToggleAll } = useTodos();

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
