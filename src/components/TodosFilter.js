import React from 'react';
import PropTypes from 'prop-types';

export default class TodosFilter extends React.Component {
  state = {};

  render() {
    const { view, onStatusClick } = this.props;

    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={view === 'all' ? 'selected' : ''}
            onClick={onStatusClick}
            view="all"
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={view === 'active' ? 'selected' : ''}
            onClick={onStatusClick}
            view="active"
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={view === 'completed' ? 'selected' : ''}
            onClick={onStatusClick}
            view="completed"
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

TodosFilter.propTypes = {
  view: PropTypes.string.isRequired,
  onStatusClick: PropTypes.func.isRequired,
};
