import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';
import './Footer.css';

export class Footer extends PureComponent {
  state = {
    filterName: 'all',
  };

  handleClick =(event) => {
    const filterName = event.target.dataset.name;
    const { filter } = this.props;

    filter(filterName);
    this.setState({
      filterName,
    });
  };

  render() {
    const { length, clear } = this.props;
    const { filterName } = this.state;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${length} items left`}
        </span>

        <ul className="filters">
          <li>
            <button
              type="button"
              data-name="all"
              className={cx(
                'filters-btn',
                { selected: filterName === 'all' },
              )}
              onClick={this.handleClick}
            >
              All
            </button>
          </li>

          <li>
            <button
              type="button"
              data-name="active"
              className={cx(
                'filters-btn',
                { selected: filterName === 'active' },
              )}
              onClick={this.handleClick}
            >
              Active
            </button>
          </li>

          <li>
            <button
              type="button"
              data-name="completed"
              className={cx(
                'filters-btn',
                { selected: filterName === 'completed' },
              )}
              onClick={e => this.handleClick(e)}
            >
              Completed
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={clear}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  filter: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};
