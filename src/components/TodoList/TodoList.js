import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const {
    items,
    activeItems,
    removeTask,
    changeStatus,
    removeCompleted,
    showAll,
    showCompleted,
    showActive,
    checkedAll,
    isCheckedAll,
    activeTab,
    taskEdited,
  } = props;

  return (
    <>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          checked={items.length ? isCheckedAll : false}
          className="toggle-all"
          onChange={checkedAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {items.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              changeStatus={changeStatus}
              removeTask={removeTask}
              taskEdited={taskEdited}
            />
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          {`${activeItems} tasks left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={cx({ selected: activeTab === 'All' })}
              onClick={showAll}
            >
            All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={cx({ selected: activeTab === 'Active' })}
              onClick={showActive}
            >
            Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={cx({ selected: activeTab === 'Completed' })}
              onClick={showCompleted}
            >
            Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={removeCompleted}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  activeItems: PropTypes.number.isRequired,
  isCheckedAll: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  removeTask: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  removeCompleted: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired,
  showCompleted: PropTypes.func.isRequired,
  showActive: PropTypes.func.isRequired,
  checkedAll: PropTypes.func.isRequired,
  taskEdited: PropTypes.func.isRequired,
};
