import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TodoType } from '../../types';

export const TodoItem = ({
  todo,
  handleCompleteTodo,
  handleChangeTodo,
  handleDeleteTodo,
}) => {
  const [onDoubleClick, clickHandler] = useState(0);
  const [currentTitle, handleChangeTitle] = useState(todo.title);

  const setClicksQuantity = (e) => {
    handleChangeTitle(e.target.value);
  };

  const handleEditTodo = (e) => {
    if (e.key === 'Enter' && currentTitle !== '') {
      clickHandler(0);
      handleChangeTodo(todo.id, currentTitle);
    }

    if (e.key === 'Escape') {
      clickHandler(0);
      handleChangeTitle(todo.title);
    }
  };

  const { completed, id } = todo;

  return (
    <li className={classNames({
      completed,
      editing: onDoubleClick === 2,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          onChange={() => handleCompleteTodo(id)}
        />
        <label onClick={() => {
          clickHandler(currentNo => currentNo + 1);
        }}
        >
          {currentTitle}
        </label>
        <button
          onClick={() => handleDeleteTodo(id)}
          type="button"
          className="destroy"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={currentTitle}
        onChange={setClicksQuantity}
        onKeyUp={handleEditTodo}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: TodoType.isRequired,
  handleCompleteTodo: PropTypes.func.isRequired,
  handleChangeTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
};
