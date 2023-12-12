import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  sortBy: React.Dispatch<React.SetStateAction<string>>
};

export const TodosFilter: React.FC<Props> = ({ sortBy }) => {
  const [selected, setSelected] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const handlerAllFilterSelected = () => {
    sortBy('all');
    setSelected({
      all: true,
      active: false,
      completed: false,
    });
  };

  const handlerActiveFilterSelected = () => {
    sortBy('active');
    setSelected({
      all: false,
      active: true,
      completed: false,
    });
  };

  const handlerCompletedFilterSelected = () => {
    sortBy('completed');
    setSelected({
      all: false,
      active: false,
      completed: true,
    });
  };

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames(selected.all && 'selected')}
          onClick={handlerAllFilterSelected}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames(selected.active && 'selected')}
          onClick={handlerActiveFilterSelected}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames(selected.completed && 'selected')}
          onClick={handlerCompletedFilterSelected}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
