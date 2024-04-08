import classNames from 'classnames';
import { Status } from '../../types/Status';
import { useContext } from 'react';
import { DispatchContext, TodosContext } from '../../store/Store';

type Props = {
  currentFilter: Status;
};

export const FilterItem: React.FC<Props> = ({ currentFilter }) => {
  const { filter } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  let link = currentFilter.toLowerCase();

  if (filter === Status.all) {
    link = '';
  }

  return (
    <li key={currentFilter}>
      <a
        href={`#/${link}`}
        className={classNames({ selected: filter === currentFilter })}
        onClick={() => {
          dispatch({
            type: 'filter',
            payload: currentFilter,
          });
        }}
      >
        {currentFilter}
      </a>
    </li>
  );
};
