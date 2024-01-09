import classNames from 'classnames';
import { Status } from '../type/Status';

const filters = [
  {
    title: 'All',
    hash: Status.all,
  },
  {
    title: 'Active',
    hash: Status.active,
  },
  {
    title: 'Completed',
    hash: Status.completed,
  },
];

type Props = {
  currentUrl: string;
};

const TodosFilter: React.FC<Props> = ({ currentUrl }) => {
  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(({ title, hash }) => (
        <li key={hash}>
          <a
            href={hash}
            className={classNames({ selected: hash === currentUrl })}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TodosFilter;
