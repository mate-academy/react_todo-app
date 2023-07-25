type Props = {
  todosLength: number,
};

export const TodosFilter: React.FC<Props> = ({ todosLength }) => {
  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLength} items left`}
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

      <button type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
