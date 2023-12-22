import classNames from 'classnames';
import {
  Status, useDispatch, useSelector,
} from '../../../contexts/TodosContext';

const filters = [
  {
    href: '#/',
    title: Status.ALL,
  },
  {
    href: '#/active',
    title: Status.ACTIVE,
  },
  {
    href: '#/completed',
    title: Status.COMPLETED,
  },
];

export const TodosFilter = () => {
  const { filter } = useSelector();
  const dispatch = useDispatch();

  const handleChangeFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filterValue: Status,
  ) => {
    event.preventDefault();

    dispatch({ type: 'setFilter', payload: filterValue });
  };

  return (
    <ul className="filters">
      {filters.map(({ href, title }) => (
        <li key={title}>
          <a
            href={href}
            className={classNames({
              selected: title === filter,
            })}
            onClick={e => handleChangeFilter(e, title)}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
};
