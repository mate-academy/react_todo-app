import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class TodosFilters extends React.Component {
  buttonsFilter = [
    {
      href: '#/',
      text: 'All',
    },
    {
      href: '#/active',
      text: 'Active',
    },
    {
      href: '#/completed',
      text: 'Completed',
    },
  ];

  render() {
    const
      { activeTodoCounter,
        currentFilter,
        filterSelector,
        removeCompleted }
      = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${activeTodoCounter()} items left`}
        </span>

        <ul className="filters">
          {this.buttonsFilter.map(button => (
            <li key={button.text}>
              <a
                href={button.href}
                className={cn({ selected: currentFilter === `${button.text}` })}
                onClick={({ target }) => filterSelector(target.text)}
              >
                {button.text}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={removeCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

TodosFilters.propTypes = {
  activeTodoCounter: PropTypes.func.isRequired,
  currentFilter: PropTypes.number.isRequired,
  filterSelector: PropTypes.func.isRequired,
  removeCompleted: PropTypes.func.isRequired,
};
