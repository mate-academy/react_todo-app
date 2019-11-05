import React from 'react';
import classNames from 'classnames/';

function TodoItem({
  item, toDelete, toggled, editText, editEnter,
}) {
  return (
    <li
      className={classNames(
        item.done ? 'completed' : '',
        item.editMode ? 'editing' : '',
      )}
      onDoubleClick={() => editText(item)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`todo-${item.id}`}
          onChange={() => toggled(item.id)}
          checked={item.done}
        />
        <label htmlFor={`todo-${item.id}`}>{ item.title }</label>
        <button
          type="button"
          className="destroy"
          onClick={() => toDelete(item.id)}
        />
      </div>
      {item.editMode
        && (
          <input
            type="text"
            className="edit"
            autoFocus={true}
            defaultValue={item.title}
            onKeyDown={event => editEnter(event)}
            id={`todo-${item.id}`}
          />
        )}
    </li>
  );
}

export default TodoItem;
