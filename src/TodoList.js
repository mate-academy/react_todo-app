import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  handleCompleted,
  handleCompletedAll,
  allCompleted,
  handleDelete,
}) => (

  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={handleCompletedAll}
      checked={allCompleted}
    />
    <label
      htmlFor="toggle-all"
    >
      Mark all as complete
    </label>

    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          handleCompleted={handleCompleted}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCompleted: PropTypes.func.isRequired,
  handleCompletedAll: PropTypes.func.isRequired,
  allCompleted: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoList;
