import React from 'react';

import { TodoFiltersTypes } from '../PropTypes/PropTypes';

class Filters extends React.Component {
  state = {
    active: 1,
  }

  stateProps = () => {
    this.props.handleFieldChange(this.state.active);
  }

  render() {
    const { active } = this.state;
    const {
      activeProblems,
      footerDisplay,
      completedAppears,
      clearCompleted,
    } = this.props;

    return (
      <footer className="footer" style={{ display: footerDisplay }}>
        <span className="todo-count">
          {activeProblems()}
        </span>

        <ul className="filters">
          <li>
            <a
              className={active === 1 ? 'selected' : ''}
              href="#/"
              onClick={this.stateProps}
              onFocus={() => this.setState({ active: 1 })}
            >
              All
            </a>
          </li>

          <li>
            <a
              className={active === 2 ? 'selected' : ''}
              href="#/active"
              onClick={this.stateProps}
              onFocus={() => this.setState({ active: 2 })}
            >
              Active
            </a>
          </li>

          <li>
            <a
              className={active === 3 ? 'selected' : ''}
              href="#/completed"
              onClick={this.stateProps}
              onFocus={() => this.setState({ active: 3 })}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          style={{ display: 'block' }}
          onClick={clearCompleted}
        >
          {completedAppears() && 'Clear completed' }
        </button>
      </footer>
    );
  }
}

Filters.propTypes = TodoFiltersTypes;

export default Filters;
