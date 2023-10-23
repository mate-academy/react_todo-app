import { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../utils/Status';

type Props = {
  selectedFilterParam: string,
  onClick: (filterParam: string) => void
};

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
        {(Object.keys(Status) as Array<keyof typeof Status>).map(key => (
          <li key={key}>
            <a
              href={`#/${key !== 'All'
                ? key
                : ''}`}
              className={cn({ selected: selectedFilterParam === Status[key] })}
              onClick={() => onClick(Status[key])}
            >
              {Status[key].at(0)?.toUpperCase() + Status[key].slice(1)}
            </a>
          </li>
        ))}
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
