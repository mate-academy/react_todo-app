import React from 'react';
import PropTypes from 'prop-types';
import { TodoShape } from '../../shapes/TodoShape';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ items, changeTodoStatus, deleteTodo }) => (
  <ul className="todo-list">
    {items.map(item => (
      <TodoItem
        key={item.id}
        item={item}
        changeTodoStatus={changeTodoStatus}
        deleteTodo={deleteTodo}
      />
    ))}

    {/* <li className="editing"> */}
    {/*  <div className="view"> */}
    {/*    <input type="checkbox" className="toggle" /> */}
    {/*    <label>zxcvbnm</label> */}
    {/*    <button type="button" className="destroy" /> */}
    {/*  </div> */}
    {/*  <input type="text" className="edit" /> */}
    {/* </li> */}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(TodoShape)),
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  items: [],
};
