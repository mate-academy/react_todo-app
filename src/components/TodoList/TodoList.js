/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

  createFilteredTodos = (list, switcher) => {
    switch (switcher) {
      case 'completed':
        return [...list].filter(item => item.completed);
      case 'active':
        return [...list].filter(item => !item.completed);
      default:
        return [...list];
    }
  };

  render() {
    const {
      items,
      changeCompleted,
      removeTodos,
      editTask,
      setCompletedAll,
    } = this.props;
    const { filter } = this.state;
    const filteredTodos = this.createFilteredTodos(items, filter);

    return (
      <>
        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={filteredTodos.every(item => item.completed)}
            onChange={event => setCompletedAll(event.target.checked)}
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
              <a
                href="#/"
                className={classNames({ selected: filter === 'all' })}
                onClick={this.handleFilters}
              >
                    All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={classNames({ selected: filter === 'active' })}
                onClick={this.handleFilters}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={classNames({ selected: filter === 'completed' })}
                onClick={this.handleFilters}
              >
                Completed
              </a>
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
