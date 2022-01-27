import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TodoItem = ({
  todo,
  deleteTodo,
  changeComplete,
  changeEditing,
  changeItem,
}) => {
  const [click, setClick] = useState(false);

  return (
    <li
      key={todo.id}
      className={classNames(
        { completed: todo.completed },
        { editing: click },
      )}
      onDoubleClick={() => {
        changeEditing(todo.id);
        setClick(true);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => changeComplete(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={todo.title}
        onChange={event => changeItem(event.target.value, todo.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setClick(false);
          }

          if (event.key === 'Escape') {
            changeItem(todo.prevText, todo.id);
            setClick(false);
          }
        }}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.objectOf().isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeComplete: PropTypes.func.isRequired,
  changeEditing: PropTypes.func.isRequired,
  changeItem: PropTypes.func.isRequired,
};

export default TodoItem;
