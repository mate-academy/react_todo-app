type Props = {
  isChecked: boolean;
  toggleAll: () => Promise<void>;
};

export const ToggleAll: React.FC<Props> = ({ isChecked, toggleAll }) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isChecked}
        onChange={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
