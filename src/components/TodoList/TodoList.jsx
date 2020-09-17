import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos, setTodos, changeCompleted }) => (
  <ul className="todo-list">
    <TodoItem
      todos={todos}
      setTodos={setTodos}
      changeCompleted={changeCompleted}
    />

    {/* <li className="editing">
      <div className="view">
        <input type="checkbox" className="toggle" />
        <label>zxcvbnm</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li> */}

  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
