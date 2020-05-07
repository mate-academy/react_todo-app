import React from 'react';
import ClassNames from 'classnames';

const filtersButton = [
  {
    title: 'All',
    href: '#/',
    id: 0,
  },
  {
    title: 'Active',
    href: '#/active',
    id: 1,
  },
  {
    title: 'Completed',
    href: '#/completed',
    id: 2,
  },
];

class Footer extends React.Component {

  filteredTodos = (filter) => (
    this.props.filterTodo(filter)
  );

  clearCompleted = () => (
    this.props.clearCompletedTodos()
  );

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          {`${this.props.countActive} items left`}
        </span>

        <ul className="filters">
          {filtersButton.map(filter => (
            <span key={filter.id}>
              <li>
                <a
                  href={filter.href}
                  onClick={() => (this.filteredTodos(filter.title))}
                  className={ClassNames(
                    { selected: this.props.isFilterAll },
                    { selected: this.props.isFilterActive },
                    { selected: this.props.isFilterCompleted },
                  )}
                >
                  {filter.title}
                </a>
              </li>
            </span>
          ))}
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={this.clearCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
