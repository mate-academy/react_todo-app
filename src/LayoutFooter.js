import React from 'react';
import PropTypes from 'prop-types';

class LayoutFooter extends React.Component {
  render() {
    const checkDoos = this.props.showFooter();
    const show = this.props.getShow();

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
                onClick={this.props.showAll}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={show === 'Active' ? 'selected' : ''}
                onClick={this.props.activeOnly}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={show === 'Completed' ? 'selected' : ''}
                onClick={this.props.completedOnly}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.props.clearCompleted}
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
  getShow: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired,
  activeOnly: PropTypes.func.isRequired,
  completedOnly: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default LayoutFooter;
