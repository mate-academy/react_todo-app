import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import cn from 'classnames';

export class Footer extends React.PureComponent {
  render() {
    const {
      todos,
      clickHandler,
      clearCompleted,
      filterSelected,
    } = this.props;

    const activeTodos = todos.filter(todo => !todo.done);

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${activeTodos.length} items left`}
        </span>
        <ul className="filters">
          <li>
            <a
              onClick={e => clickHandler(e)}
              href="#/"
              className={cn({ selected: filterSelected === 'all' })}
              name="all"
            >
              All
            </a>
          </li>

          <li>
            <a
              className={cn({ selected: filterSelected === 'active' })}
              onClick={e => clickHandler(e)}
              href="#/active"
              name="active"
            >
              Active
            </a>
          </li>

          <li>
            <a
              className={cn({ selected: filterSelected === 'completed' })}
              onClick={e => clickHandler(e)}
              href="#/completed"
              name="completed"
            >
              Completed
            </a>
          </li>
        </ul>
        {todos.some(todo => todo.done === true)
          && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => clearCompleted()}
            >
              Clear completed
            </button>
          )}
      </footer>
    );
  }
}

Footer.propTypes = {
  todos: arrayOf(PropTypes.shape({
    id: PropTypes.string,
    done: PropTypes.bool,
    text: PropTypes.string,
  })).isRequired,
  clickHandler: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filterSelected: PropTypes.string.isRequired,
};
