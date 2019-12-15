import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Footer extends Component {
  state = {
    isActive: 'All',
  };

  render() {
    const { isActive } = this.state;
    const { todos, TodosDone, setStateByEtargetValue } = this.props;

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
                  onClick={(w) => {
                    setStateByEtargetValue(w); this.setState({
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
                  onClick={(w) => {
                    setStateByEtargetValue(w); this.setState({
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
                  onClick={(w) => {
                    setStateByEtargetValue(w); this.setState({
                      isActive: 'Completed',
                    });
                  }}
                  className={isActive === 'Completed' ? 'selected' : ''}
                >
Completed
                </a>
              </li>
            </ul>

            <button
              onClick={(w) => {
                setStateByEtargetValue(w);
              }}
              type="button"
              className="clear-completed"
            >
            Clear completed
            </button>
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
  setStateByEtargetValue: PropTypes.func.isRequired,
};
