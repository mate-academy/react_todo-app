import React, { useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { deleteTodo } from '../../api/todos';
import { changeTodoField } from '../../api/todos';

export function TodoItem({ title, completed, id, upDateUserTodos }) {
  const [value, setValue] = useState(title);
  const [isEditMode, setEditMode] = useState(false);

  function handleCompleted() {
    if (completed) {
      changeTodoField(id, false, "completed")
        .then(() => upDateUserTodos());

    } else {
      changeTodoField(id, true, "completed")
        .then(() => upDateUserTodos());
    }
  }

  function handleDeleteItem(id) {
    deleteTodo(id)
      .then(() => upDateUserTodos())
  }

  function handleCloseEdit(e) {
    if (e.keyCode === 27) {
      setEditMode(false);
    }

    if (e.key === 'Enter') {
      changeTodoField(id, value, "title")
        .then(() => upDateUserTodos());
      setEditMode(false);
    }
  }

  return (
    <li>
      <div className={classNames("view", {"completed": completed})}>
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCompleted}
        />
         { !isEditMode
           ? (
             <>
              <label onDoubleClick={() => setEditMode(true)}>
                { title }
              </label>
                <button
                type="button"
                className="destroy"
                onClick={() => handleDeleteItem(id)}
              />
            </>
           )
           : (
              <input
                type="text"
                className="todo__edit"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => handleCloseEdit(e)}
                autoFocus
                value={value}
                onBlur={() => setEditMode(false)}
              />
            )}
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
}
