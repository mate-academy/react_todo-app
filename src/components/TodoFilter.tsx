import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';

export const TodoFilter = () => {
  const [status, setStatus] = useState('all');

  return (
    <ul className="filters">
      <li>
        <NavLink
          to="/"
          className={classNames({ selected: status === 'all' })}
          onClick={() => setStatus('All')}
        >
          All
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/active"
          className={classNames({ selected: status === 'active' })}
          onClick={() => setStatus('active')}
        >
          Active
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/completed"
          className={classNames({ selected: status === 'completed' })}
          onClick={() => setStatus('completed')}
        >
          Completed
        </NavLink>
      </li>
    </ul>
  );
};
