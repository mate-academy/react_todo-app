import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  toggleFilter: (event: string) => void,
};

export const TodosFilter: React.FC<Props> = ({ toggleFilter }) => {
  const [toggled, setToggled] = useState('all');

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: toggled === 'all' })}
          onClick={() => {
            toggleFilter('all');
            setToggled('all');
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: toggled === 'active' })}
          onClick={() => {
            toggleFilter('active');
            setToggled('active');
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: toggled === 'completed' })}
          onClick={() => {
            toggleFilter('completed');
            setToggled('completed');
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
