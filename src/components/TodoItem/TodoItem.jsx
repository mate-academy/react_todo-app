import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { deleteTodo } from '../../api/todos';
import { changeCompletedTodo } from '../../api/todos';

export function TodoItem({ title, completed, id, upDateUserTodos }) {

  const [value, setValue] = useState('');
  const [isEditMode, setEditMode] = useState(true);
  const inputRef = useRef(null);

  const editTodo = () => {
    setEditMode(!isEditMode);

    console.log(isEditMode);
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

  return (
    <li>
      <div
        className={classNames("view", {"completed": completed})}
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleCompleted}
        />
        <label
            onDoubleClick={() => editTodo()}
        >
          { title }
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleDeleteItem(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
      />
    </li>
  );
}
