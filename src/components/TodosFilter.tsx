import classNames from 'classnames';
import { useSignals } from '@preact/signals-react/runtime';
import { filter } from '../signals/filter-signal';

export const TodosFilter = () => {
  useSignals();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    switch (event.currentTarget.innerText) {
      default:
      case 'All':
        filter.value = 'all';
        break;
      case 'Active':
        filter.value = 'active';
        break;
      case 'Completed':
        filter.value = 'completed';
    }
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filter.value === 'all' })}
          onClick={handleClick}
        >
          All

        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filter.value === 'active' })}
          onClick={handleClick}
        >
          Active

        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filter.value === 'completed' })}
          onClick={handleClick}
        >
          Completed

        </a>
      </li>
    </ul>
  );
};
