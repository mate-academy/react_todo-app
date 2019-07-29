import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const TodoList = ({
  onCheck,
  todos,
  onRemove,
  onToggle,
}) => (
  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={onToggle}
    />
    {/* eslint-disable-next-line */}
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          onCheck={onCheck}
          onRemove={onRemove}
          key={todo.id}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCheck: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;
