import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const {
    todos,
    removeTask,
    changeStatus,
    checkAll,
    isCheckedAll,
    editTask,
  } = props;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        checked={todos.length ? isCheckedAll : false}
        className="toggle-all"
        onChange={checkAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            changeStatus={changeStatus}
            removeTask={removeTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    task: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  isCheckedAll: PropTypes.bool.isRequired,
  removeTask: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};
