import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TodoShape } from '../../shapes/TodoShape';

export const TodoItem = ({ item, changeTodoStatus, deleteTodo }) => (
  <li className={classnames({
    completed: item.completed,
  })}
  >
    <div className="view">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => changeTodoStatus(item.id, item.completed)}
        className="toggle"
      />
      <label>{item.title}</label>
      <button
        type="button"
        className="destroy"
        onClick={() => deleteTodo(item.id)}
      />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  item: PropTypes.shape(TodoShape).isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
