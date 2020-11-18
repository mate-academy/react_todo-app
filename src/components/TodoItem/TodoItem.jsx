import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TodoShape } from '../../shapes/TodoShape';

export const TodoItem = ({
  item,
  changeTodoStatus,
  deleteTodo,
  changeTodoTitle,
}) => {
  const [newTitle, setNewTitle] = useState(item.title);
  const [isInputEditing, setIsInputEditing] = useState(false);

  const updateNewTitle = (event) => {
    const { value } = event.target;

    setNewTitle(value);
  };

  const editTodoTitle = (event) => {
    const { id } = item;
    const { key } = event;

    if (key === 'Enter' && newTitle === '') {
      deleteTodo(id);
      setIsInputEditing(false);
    } else if (key === 'Enter' && newTitle !== '') {
      changeTodoTitle(id, newTitle);
      setIsInputEditing(false);
    } else if (key === 'Escape') {
      setNewTitle(item.title);
      setIsInputEditing(false);
    }
  };

  const handleBlur = (event) => {
    const { value } = event.target;
    const { id } = item;

    changeTodoTitle(id, value);
    setIsInputEditing(false);
  };

  return (
    <li
      className={classnames({
        completed: item.completed,
        editing: isInputEditing,
      })}
      onDoubleClick={() => setIsInputEditing(true)}
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
      <input
        type="text"
        className="edit"
        value={newTitle}
        onChange={updateNewTitle}
        onKeyDown={editTodoTitle}
        onBlur={handleBlur}
      />
    </li>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape(TodoShape).isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeTodoTitle: PropTypes.func.isRequired,
};
