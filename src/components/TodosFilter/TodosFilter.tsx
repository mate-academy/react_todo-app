import { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';

type Props = {
  selectedFilterParam: string,
  onClick: (filterParam: string) => void
};

enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodosFilter: React.FC<Props> = ({
  selectedFilterParam,
  onClick,
}) => {
  const { todos, setTodos } = useContext(TodosContext);

  const getUncompletedTodos = () => (
    todos.filter(({ completed }) => !completed));

  const getCompletedTodos = () => (
    todos.filter(({ completed }) => completed)
  );

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${getUncompletedTodos().length} items left`}
      </span>

      <ul className="filters" data-cy="todosFilter">
        <li>
          <a
            href="#/"
            className={cn({ selected: selectedFilterParam === Status.All })}
            onClick={() => onClick(Status.All)}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: selectedFilterParam === Status.Active })}
            onClick={() => onClick(Status.Active)}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({
              selected: selectedFilterParam === Status.Completed,
            })}
            onClick={() => onClick(Status.Completed)}
          >
            Completed
          </a>
        </li>
      </ul>
      {!!getCompletedTodos().length && (
        <button
          type="button"
          className="clear-completed"
          onClick={() => setTodos(getUncompletedTodos())}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
