import React from 'react';
import classNames from 'classnames';

type Props = {
  activeFilter: string,
  filter: {
    all: () => void;
    active: () => void;
    completed: () => void;
  }
};

export const TodosFilter: React.FC<Props> = (props) => {
  const { activeFilter, filter } = props;

  return (
    <ul className="filters">
      <li key="all">
        <button type="button" className={classNames('', { selected: activeFilter === 'all' })} onClick={() => filter.all()}>All</button>
      </li>

      <li key="active">
        <button
          type="button"
          className={classNames('', { selected: activeFilter === 'active' })}
          onClick={() => filter.active()}
        >
          Active
        </button>
      </li>

      <li key="completed">
        <button
          type="button"
          className={classNames('', { selected: activeFilter === 'completed' })}
          onClick={() => filter.completed()}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};
