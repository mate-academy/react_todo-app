import classNames from 'classnames';
import { useSignals } from '@preact/signals-react/runtime';
import { filter } from '../signals/filter-signal';
import { FilterValues } from '../types';

export const TodosFilter = () => {
  useSignals();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    switch (event.currentTarget.innerText) {
      case FilterValues.All:
        filter.value = FilterValues.All;
        break;

      case FilterValues.Active:
        filter.value = FilterValues.Active;
        break;

      case FilterValues.Completed:
        filter.value = FilterValues.Completed;
        break;

      default:
        break;
    }
  };

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames(
            { selected: filter.value === FilterValues.All },
          )}
          onClick={handleClick}
        >
          All

        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames(
            { selected: filter.value === FilterValues.Active },
          )}
          onClick={handleClick}
        >
          Active

        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames(
            { selected: filter.value === FilterValues.Completed },
          )}
          onClick={handleClick}
        >
          Completed

        </a>
      </li>
    </ul>
  );
};
