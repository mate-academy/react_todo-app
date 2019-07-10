import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

const TodoList = ({ todos, filterTasks, selectAll, filter, finishedTasks }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={selectAll}
      checked={finishedTasks.length === todos.length}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {todos.filter(task => filterTasks(task, filter))
        .map(task => <Task key={task.id} {...task} />)}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterTasks: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  finishedTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TodoList;
