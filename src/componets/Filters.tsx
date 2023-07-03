import classNames from 'classnames';
import { FilterById } from '../type/FilterById';

const { ALL, ACTIVE, COMPLATED } = FilterById;

type Props = {
  filterId: FilterById
  setFilterId: (value: FilterById) => void
};

export const Filters: React.FC<Props> = (
  {
    filterId, setFilterId,
  },
) => {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filterId === ALL })}
          onClick={() => setFilterId(ALL)}
        >
          All
        </a>
      </li>

      <li>
        <a
          className={classNames({ selected: filterId === ACTIVE })}
          onClick={() => setFilterId(ACTIVE)}
          href="#/active"
        >
          Active
        </a>
      </li>

      <li>
        <a
          className={classNames({ selected: filterId === COMPLATED })}
          onClick={() => setFilterId(COMPLATED)}
          href="#/completed"
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
