import React from 'react';

import PropTypes from 'prop-types';

const _ = require('lodash');

const TodoItem = ({
  todo,
  toggleCompleteStatus,
  toggleRemoveTodo,
}) => (
  <li key={_.uniqueId('todo_')} className="">
    <div className="view">
      <input
        key={_.uniqueId('')}
        type="checkbox"
        className="toggle"
        onChange={() => toggleCompleteStatus(todo.id)}
        id={todo.id}
        checked={todo.completed}
      />
      <label
        htmlFor="todo-1"
        className={todo.completed ? 'toggle_line-through' : ''}
      >
        {todo.title}
      </label>
      <button
        type="button"
        className="destroy"
        onClick={() => toggleRemoveTodo(todo.id)}
      />
    </div>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  toggleCompleteStatus: PropTypes.func.isRequired,
  toggleRemoveTodo: PropTypes.func.isRequired,
};

export default TodoItem;
