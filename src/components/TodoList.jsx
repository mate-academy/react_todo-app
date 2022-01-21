/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TodoItem from './TodoItem';

const TodoList = ({
  items,
  deleteTodo,
  changeComplete,
  allComplete,
  clearCompleted,
}) => {
  const [newArr, setNewArr] = useState(items);
  const [filterAll, setFilterAll] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const todosFilter = (condition) => {
    switch (condition) {
      case 'all':
        return setNewArr(items);
      case 'active':
        return setNewArr([...items].filter(
          todo => todo.completed !== true,
        ));
      case 'completed':
        return setNewArr([...items].filter(
          todo => todo.completed === true,
        ));
      default:
        return 0;
    }
  };

  useEffect(() => {
    setNewArr(items);
  }, [items]);

  return (
    <>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={() => allComplete()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {newArr.map(todo => (
            <TodoItem
              todo={todo}
              deleteTodo={deleteTodo}
              changeComplete={changeComplete}
            />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          {[...items].filter(x => x.completed === false).length}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({ selected: filterAll.all })}
              onClick={() => {
                todosFilter('all');
                setFilterAll({
                  all: true,
                  active: false,
                  completed: true,
                });
              }}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={classNames({ selected: filterAll.active })}
              onClick={() => {
                todosFilter('active');
                setFilterAll({
                  all: false,
                  active: true,
                  completed: false,
                });
              }}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={classNames({ selected: filterAll.completed })}
              onClick={() => {
                todosFilter('completed');
                setFilterAll({
                  all: false,
                  active: false,
                  completed: true,
                });
              }}
            >
              Completed
            </a>
          </li>
        </ul>

        {[...items].find(x => x.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={() => clearCompleted()}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};

TodoList.propTypes = {
  items: PropTypes.arrayOf().isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeComplete: PropTypes.func.isRequired,
  allComplete: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default TodoList;
