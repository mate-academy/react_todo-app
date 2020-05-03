import React from 'react';
import PropTypes, { object } from 'prop-types';

class Footer extends React.PureComponent {
  render() {
    const { todos, activeList, changePage, clearCompletedTodo } = this.props;
    const pageViews = ['all', 'active', 'completed'];

    return (
      <footer className="footer">
        <span className="todo-count">
          {todos.filter(todo => !todo.completed).length}
          {' '}
          items left
        </span>

        <ul className="filters">
          {pageViews.map(views => (
            <li>
              <a
                href={`#/${views}`}
                className={activeList === views ? 'selected' : ''}
                onClick={() => changePage(views)}
              >
                {views}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={() => clearCompletedTodo()}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  activeList: PropTypes.string.isRequired,
  changePage: PropTypes.func.isRequired,
  clearCompletedTodo: PropTypes.func.isRequired,
};

export default Footer;
