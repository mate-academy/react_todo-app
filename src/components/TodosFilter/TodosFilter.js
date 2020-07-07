import React from 'react';
import classnames from 'classnames';
import { TodosFilterShape } from '../../Shapes';

export const TodosFilter = (props) => {
  const { setActiveTab, activeTab } = props;

  const filters = ['all', 'active', 'completed'];

  return (
    <ul className="filters">
      {filters.map(item => (
        <li key={item}>
          <a
            href="#/"
            name={item}
            className={classnames({ selected: activeTab === item })}
            onClick={event => setActiveTab(event.target.name)}
          >
            {item.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
  );
};

TodosFilter.propTypes = TodosFilterShape.isRequired;
