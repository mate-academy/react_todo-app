import { useContext } from 'react';
import cn from 'classnames';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../types/Status';

const filters = [
  { status: Status.All, title: 'All' },
  { status: Status.Active, title: 'Active' },
  { status: Status.Completed, title: 'Completed' },
];

export const TodosFilter: React.FC<{}> = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      {filters.map(filtr => (
        <li key={filtr.status}>
          <a
            href={`#/${filtr.status}`}
            className={cn({
              selected: filter === filtr.status,
            })}
            onClick={() => setFilter(filtr.status)}
          >
            {filtr.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
