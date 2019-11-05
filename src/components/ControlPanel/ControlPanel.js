import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import './ControlPanel.css';

class ControlPanel extends PureComponent {
  render() {
    const { todosCount, isCompletedSomething, tabListClick, clearCompleted } = this.props;

    return (
      <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {todosCount} items left
        </span>

        <ul className="filters" onClick={tabListClick}>
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          style={{ display: isCompletedSomething.length ? 'block' : 'none' }}
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

ControlPanel.propTypes = {
  todosCount: PropTypes.number.isRequired,
  isCompletedSomething: PropTypes.array.isRequired,
  tabListClick: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default ControlPanel;
