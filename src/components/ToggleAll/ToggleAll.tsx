type ToggleAllProps = {
  isActive: boolean,
  onToggle: (isActive: boolean) => void
};

export const ToggleAll: React.FC<ToggleAllProps> = ({
  isActive,
  onToggle,
}) => {
  const handleCheckboxClick = () => {
    onToggle(isActive);
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={isActive}
        data-cy="toggleAll"
        onClick={handleCheckboxClick}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>
    </>
  );
};
