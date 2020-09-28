import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { deleteTodo } from '../../api/todos';
import { changeCompletedTodo, changeTitileTodo } from '../../api/todos';

export function TodoItem({ title, completed, id, upDateUserTodos }) {

  const [value, setValue] = useState(title);
  const [isEditMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

  const editTodo = () => {
    setEditMode(true);
  }

  function handleCompleted() {
    if (completed) {
      changeCompletedTodo(id, false)
        .then(() => upDateUserTodos());

    } else {
      changeCompletedTodo(id, true)
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
      changeTitileTodo(id, value)
        .then(() => upDateUserTodos());
      setEditMode(false);
    }
  }

  function handleChangeTodo(chanhgedValue) {
    setValue(chanhgedValue);
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
              <label onDoubleClick={() => editTodo()}>
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
                onChange={(e) => handleChangeTodo(e.target.value)}
                onKeyDown={(e) => handleCloseEdit(e)}
                autoFocus
                value={value}
              />
            )}
      </div>
    </li>
  );
}
