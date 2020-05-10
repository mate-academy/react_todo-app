import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class FilterButtons extends React.PureComponent {
  render() {
    const { filter, todosFilter } = this.props;

    return (
      <ul className="filters">

        <li>
          <a
            href="#/"
            id="all"
            className={classNames({ selected: filter === 'all' })}
            onClick={todosFilter}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            id="active"
            onClick={todosFilter}
            className={classNames({ selected: filter === 'active' })}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            id="completed"
            onClick={todosFilter}
            className={classNames({ selected: filter === 'completed' })}
          >
            Completed
          </a>
        </li>

      </ul>
    );
  }
}

FilterButtons.propTypes = {
  filter: PropTypes.string.isRequired,
  todosFilter: PropTypes.func.isRequired,
};

export default FilterButtons;
