import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

class Footer extends React.PureComponent {
  render() {
    const {
      uncompleted,
      setViewMode,
      selectedView,
      clearCompleted,
    } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          {uncompleted()}
          {' '}
          items left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              id="all"
              onClick={setViewMode}
              className={className(selectedView === 'All'
                ? 'selected'
                : '')}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="#/active"
              id="active"
              onClick={setViewMode}
              className={className(selectedView === 'Active'
                ? 'selected'
                : '')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#/completed"
              id="completed"
              onClick={setViewMode}
              className={selectedView === 'Completed'
                ? 'selected'
                : ''}
            >
              Completed
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;

Footer.propTypes = {
  uncompleted: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  selectedView: PropTypes.string.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
