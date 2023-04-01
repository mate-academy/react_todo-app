type Props = {
  isAllCompleted: boolean;
  changeAllTodo: (option: boolean) => void;
};

const ToggleAll: React.FC<Props> = ({ isAllCompleted, changeAllTodo }) => {
  const onChangeHandle = () => {
    changeAllTodo(!isAllCompleted);
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isAllCompleted}
        onChange={onChangeHandle}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};

export default ToggleAll;
