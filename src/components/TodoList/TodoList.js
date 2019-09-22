/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

class TodoList extends Component {
  state = {
    filter: 'all',
  }

  handleClickButtonClear = () => {
    const { items, removeTodos } = this.props;

    removeTodos(items.filter(item => item.completed).map(item => item.id));
  }

  handleFilters = ({ target }) => {
    const filter = target.getAttribute('href').slice(2) || 'all';

    this.setState({
      filter,
    });
  }

  handleToogleAll = ({ target }) => {
    const { checked } = target;
    const { setCompletedAll } = this.props;

    setCompletedAll(checked);
  }

  render() {
    const {
      items,
      changeCompleted,
      removeTodos,
      editTask,
    } = this.props;
    const { filter } = this.state;

    const createFilteredTodos = (list, switcher) => {
      switch (switcher) {
        case 'completed':
          return [...list].filter(item => item.completed);
        case 'active':
          return [...list].filter(item => !item.completed);
        default:
          return [...list];
      }
    };

    const filteredTodos = createFilteredTodos(items, filter);

    return (
      <>
        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={filteredTodos.every(item => item.completed)}
            onChange={this.handleToogleAll}
          />
          {filteredTodos.length
            ? <label htmlFor="toggle-all">Mark all as complete</label>
            : null
          }

          <ul className="todo-list">
            {filteredTodos
              .map(item => (
                <TodoItem
                  item={item}
                  key={item.id}
                  changeCompleted={changeCompleted}
                  removeTodos={removeTodos}
                  editTask={editTask}
                />
              ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${items.filter(item => !item.completed).length} items left`}
          </span>

          <ul className="filters">
            <li>
              {filter === 'all'
                ? (
                  <a
                    href="#/"
                    className="selected"
                    onClick={this.handleFilters}
                  >
                    All
                  </a>
                )
                : <a href="#/" onClick={this.handleFilters}>All</a>}
            </li>

            <li>
              {filter === 'active'
                ? (
                  <a
                    href="#/active"
                    className="selected"
                    onClick={this.handleFilters}
                  >
                    Active
                  </a>
                ) : <a href="#/active" onClick={this.handleFilters}>Active</a>}
            </li>

            <li>
              {filter === 'completed'
                ? (
                  <a
                    href="#/completed"
                    className="selected"
                    onClick={this.handleFilters}
                  >
                    Completed
                  </a>
                ) : (
                  <a
                    href="#/completed"
                    onClick={this.handleFilters}
                  >
                    Completed
                  </a>
                )}
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={items.some(item => item.completed)
              ? ({ display: 'block' })
              : ({ display: 'none' })}
            onClick={this.handleClickButtonClear}
          />
        </footer>
      </>
    );
  }
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  removeTodos: PropTypes.func.isRequired,
  setCompletedAll: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default TodoList;
