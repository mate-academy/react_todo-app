import React from 'react';
import { TodosFilterShape } from '../../Shapes';

export const TodosFilter = (props) => {
  const { setActiveTab, activeTab } = props;

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          name="all"
          className={`${activeTab === 'all' ? 'selected' : ''}`}
          onClick={event => setActiveTab(event.target.name)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          name="active"
          className={`${activeTab === 'active' ? 'selected' : ''}`}
          onClick={event => setActiveTab(event.target.name)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          name="completed"
          className={`${activeTab === 'completed' ? 'selected' : ''}`}
          onClick={event => setActiveTab(event.target.name)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

TodosFilter.propTypes = TodosFilterShape.isRequired;
