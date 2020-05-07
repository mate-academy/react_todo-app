import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TodoItem } from '../TodoItem/TodoItem';

const TodoList = ({
  listOfTodo,
  handleCheckboxChange,
  handleDoubleClick,
  handleEditing,
  handleClickDestroy,
  handleLossFocus,
}) => (
  <ul className="todo-list">
    {listOfTodo.length !== 0
      ? listOfTodo.map(todo => (
        <li
          className={classNames(todo.elementState)}
          key={todo.id}
        >
          <TodoItem
            todo={todo}
            handleCheckboxChange={handleCheckboxChange}
            handleDoubleClick={handleDoubleClick}
            handleEditing={handleEditing}
            handleClickDestroy={handleClickDestroy}
            handleLossFocus={handleLossFocus}
          />
        </li>
      ))
      : <div />
    }
  </ul>
);

TodoList.propTypes = {
  listOfTodo: PropTypes.arrayOf(Object).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleDoubleClick: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  handleClickDestroy: PropTypes.func.isRequired,
  handleLossFocus: PropTypes.func.isRequired,
};

export default TodoList;
