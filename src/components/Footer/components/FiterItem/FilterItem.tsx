import classNames from 'classnames';
import { Status } from '../../../../types/Status';
import { useContext } from 'react';
import { DispatchContext, TodosContext } from '../../../../store/Store';

type Props = {
  currentFilter: Status;
  check: string;
};

export const FilterItem: React.FC<Props> = ({ currentFilter, check }) => {
  const { filter } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);
  let link = currentFilter.toLowerCase();

  if (filter === Status.all) {
    link = '';
  }

  return (
    <a
      href={`#${link}`}
      className={classNames('filter__link', {
        selected: filter === currentFilter,
      })}
      data-cy={check}
      onClick={() => {
        dispatch({
          type: 'filter',
          payload: currentFilter,
        });
      }}
    >
      {currentFilter}
    </a>
  );
};
