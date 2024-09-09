import React from 'react';
import classNames from 'classnames';

import './Filter.scss';
import { FilterType } from '../../types/FilterType';
import { Props } from './Props';

export const Filter: React.FC<Props> = ({ filter, onChange }) => (
  <nav className="filter" data-cy="Filter">
    <a
      href="#/"
      className={classNames('filter__link', {
        selected: filter === FilterType.All,
      })}
      data-cy="FilterLinkAll"
      onClick={() => onChange(FilterType.All)}
    >
      All
    </a>

    <a
      href="#/active"
      className={classNames('filter__link', {
        selected: filter === FilterType.Active,
      })}
      data-cy="FilterLinkActive"
      onClick={() => onChange(FilterType.Active)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={classNames('filter__link', {
        selected: filter === FilterType.Completed,
      })}
      data-cy="FilterLinkCompleted"
      onClick={() => onChange(FilterType.Completed)}
    >
      Completed
    </a>
  </nav>
);
