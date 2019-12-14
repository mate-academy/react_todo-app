import React from 'react';
import PropTypes from 'prop-types';

class LayoutFooter extends React.Component {
  render() {
    const checkDoos = this.props.showFooter();
    const show = this.props.getCurrentFilter();

    if (checkDoos.length > 0) {
      return (
        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {checkDoos.isNotDone}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={show === 'All' ? 'selected' : ''}
                onClick={this.props.showAllToDos}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={show === 'Active' ? 'selected' : ''}
                onClick={this.props.showActiveToDos}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={show === 'Completed' ? 'selected' : ''}
                onClick={this.props.showCompletedToDos}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.props.clearCompletedToDos}
          >
            Clear completed
          </button>
        </footer>
      );
    }

    return '';
  }
}

LayoutFooter.propTypes = {
  showFooter: PropTypes.func.isRequired,
  getCurrentFilter: PropTypes.func.isRequired,
  showAllToDos: PropTypes.func.isRequired,
  showActiveToDos: PropTypes.func.isRequired,
  showCompletedToDos: PropTypes.func.isRequired,
  clearCompletedToDos: PropTypes.func.isRequired,
};

export default LayoutFooter;
