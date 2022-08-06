type Props = {
  onSettingStatus: (str: string) => void;
};
export const TodosFilter: React.FC<Props> = ({ onSettingStatus }) => {
  const statusHandler: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    onSettingStatus(event.target.value);
  };

  return (
    <>
      <div className="todo-count" data-cy="todosCounter">
        3 items left
      </div>

      <div className="footer-content">
        <select
          className="filters"
          onChange={statusHandler}
        >
          <option
            value="all"
          >
            All
          </option>

          <option
            value="active"
          >
            Active
          </option>

          <option
            value="completed"
          >
            Completed
          </option>
        </select>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </div>
    </>
  );
};
