import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from './Todo';
import { TodoShape } from './Shapes';

export const TodoList = (props) => {
  const { items, changeCompleteness, destroyTodo } = props;

  return (
    <ul className="todo-list">
      {items.map(item => (
        <Todo
          key={item.id}
          item={item}
          changeCompleteness={changeCompleteness}
          destroy={destroyTodo}
        />
      ))}

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-3" />
          <label htmlFor="todo-3">zxcvbnm</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>
    </ul>
  );
};

TodoList.propTypes = {
  items: PropTypes.arrayOf(TodoShape).isRequired,
  changeCompleteness: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};
