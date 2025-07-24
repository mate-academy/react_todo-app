interface ClearCompletedButtonProps {
  todoCompleted: boolean;
  handleClearCompletedButton: () => void;
}

export const ClearCompletedButton: React.FC<ClearCompletedButtonProps> = ({
  todoCompleted,
  handleClearCompletedButton,
}) => {
  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!todoCompleted}
      onClick={handleClearCompletedButton}
    >
      Clear completed
    </button>
  );
};
