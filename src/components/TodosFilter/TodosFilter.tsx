import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { TodosContext } from '../TodosContext';

export const TodosFilter: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const { todos, setVisibleTodos } = useContext(TodosContext);

  const filterTypeChange = (type: string): void => {
    setFilterType(type);
  };

  useEffect(() => {
    switch (filterType) {
      case 'active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setVisibleTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setVisibleTodos(todos);
        break;
    }
  }, [filterType, todos]);

  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={classNames({ selected: filterType === 'all' })}
          onClick={() => filterTypeChange('all')}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({ selected: filterType === 'active' })}
          onClick={() => filterTypeChange('active')}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({ selected: filterType === 'completed' })}
          onClick={() => filterTypeChange('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
