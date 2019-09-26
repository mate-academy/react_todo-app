import React, { Component } from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

class TodoFilter extends Component {
  state ={

  }

  render() {
    const {
      activeFilterName,
      changeActiveFilter,
    } = this.props;

    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={ClassNames({
              selected: activeFilterName === 'all',
            })}
            onClick={() => changeActiveFilter('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={ClassNames({
              selected: activeFilterName === 'active',
            })}
            onClick={() => changeActiveFilter('active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={ClassNames({
              selected: activeFilterName === 'completed',
            })}
            onClick={() => changeActiveFilter('completed')}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

TodoFilter.propTypes = {
  activeFilterName: PropTypes.string.isRequired,
  changeActiveFilter: PropTypes.func.isRequired,
};

export default TodoFilter;
