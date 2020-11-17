import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TodoShape } from '../../shapes/TodoShape';

export const TodoItem = ({ item }) => (
  <li className={classnames({
    completed: item.completed,
  })}
  >
    <div className="view">
      <input type="checkbox" className="toggle" />
      <label>{item.title}</label>
      <button type="button" className="destroy" />
    </div>
    <input type="text" className="edit" />
  </li>
);

TodoItem.propTypes = {
  item: PropTypes.shape(TodoShape).isRequired,
};
