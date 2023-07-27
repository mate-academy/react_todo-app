type Props = {
  activeTodosLength: number,
  removeAllCompletedTodosFromServer: () => void,
};

export const TodosFilter: React.FC<Props> = ({
  activeTodosLength,
  removeAllCompletedTodosFromServer,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosLength} items left`}
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">All</a>
        </li>

        <li>
          <a href="#/active">Active</a>
        </li>

        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>

      <button
        type="button"
        className="clear-completed"
        onClick={removeAllCompletedTodosFromServer}
      >
        Clear completed
      </button>
    </footer>
  );
};
