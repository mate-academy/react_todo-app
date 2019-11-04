import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoFilter extends Component {
  constructor(props) {
    super(props);

    this.linkHandler = this.linkHandler.bind(this);
  }

  linkHandler(evt) {
    this.props.statusFilter(evt.target.dataset.filter);
  }

  render() {
    const { currentFilter } = this.props;

    return (
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={
              currentFilter === 'initial'
                ? 'selected'
                : ''}
            data-filter="initial"
            onClick={this.linkHandler}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={
              currentFilter === 'active'
                ? 'selected'
                : ''}
            data-filter="active"
            onClick={this.linkHandler}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={
              currentFilter === 'completed'
                ? 'selected'
                : ''}
            data-filter="completed"
            onClick={this.linkHandler}
          >
            Completed
          </a>
        </li>
      </ul>
    );
  }
}

TodoFilter.propTypes = {
  statusFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default TodoFilter;
