import classNames from 'classnames';
import { filters } from './data/filters';
import { getHash } from '../../libs/helpers';

export const TodosFilter = () => {
  const urlHash = getHash();

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(({ title, hash }) => (
        <li key={hash}>
          <a
            href={hash}
            className={classNames({ selected: hash === urlHash })}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};
