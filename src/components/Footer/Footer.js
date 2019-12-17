import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  state = {
    isActive: 'All',
  };

  render() {
    const { isActive } = this.state;
    const { todos, TodosDone, setStateByEvenTargetValue } = this.props;

    return (
      <div>
        {todos.length > 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {todos.length - TodosDone()}
              : items not finished
              <br />

            </span>

            <ul className="filters">
              <li>
                <a
                  href="./#"
                  id="buttonALL"
                  onClick={(event) => {
                    setStateByEvenTargetValue(event);
                    this.setState({
                      isActive: 'All',
                    });
                  }}
                  className={isActive === 'All' ? 'selected' : ''}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="./#"
                  onClick={(event) => {
                    setStateByEvenTargetValue(event);
                    this.setState({
                      isActive: 'Active',
                    });
                  }}
                  className={isActive === 'Active' ? 'selected' : ''}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="./#"
                  onClick={(event) => {
                    setStateByEvenTargetValue(event);
                    this.setState({
                      isActive: 'Completed',
                    });
                  }}
                  className={isActive === 'Completed' ? 'selected' : ''}
                >
                  Completed
                </a>
              </li>
            </ul>
            {todos.filter(item => item.done).length > 0 && (
              <button
                onClick={(event) => {
                  setStateByEvenTargetValue(event);
                }}
                type="button"
                className="clear-completed"
              >
              Clear completed
              </button>
            ) }
          </footer>
        )
        }
      </div>
    );
  }
}
Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  TodosDone: PropTypes.func.isRequired,
  setStateByEvenTargetValue: PropTypes.func.isRequired,
};
