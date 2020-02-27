import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';
import './Footer.css';

export class Footer extends PureComponent {
  state = {
    sorterName: 'all',
  };

  handleClick =(event) => {
    const sorterName = event.target.name;

    event.preventDefault();

    const { sort } = this.props;

    sort(sorterName);
    this.setState({
      sorterName,
    });
  };

  render() {
    const { length, clear } = this.props;
    const { sorterName } = this.state;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${length} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              name="all"
              className={cx('', { selected: sorterName === 'all' })}
              onClick={this.handleClick}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              name="active"
              className={cx('', { selected: sorterName === 'active' })}
              onClick={this.handleClick}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              name="completed"
              className={cx('', { selected: sorterName === 'completed' })}
              onClick={e => this.handleClick(e)}
            >
              Completed
            </a>
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
  sort: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};
