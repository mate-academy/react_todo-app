type Props = {
  activeTodosListLength: number,
  updateStatusAllTodosOnServer: () => void;
};

export const ToglerAllTodos: React.FC<Props> = ({
  activeTodosListLength,
  updateStatusAllTodosOnServer,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={!!activeTodosListLength}
        onChange={() => {
          updateStatusAllTodosOnServer();
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
