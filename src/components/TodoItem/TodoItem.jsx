import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { deleteTodo } from '../../api/todos';
import { changeCompletedTodoFalse, changeCompletedTodoTrue } from '../../api/todos';

export function TodoItem({ title, completed, id, upDateUserTodos }) {

  function handleCompleted(e) {
    if (completed) {
      changeCompletedTodoFalse(id)
        .then(() => upDateUserTodos());

    } else {
      changeCompletedTodoTrue(id)
        .then(() => upDateUserTodos());
    }
  }

  function handleDeleteItem(id) {
    deleteTodo(id)
      .then(() => upDateUserTodos())
  }

  return (
    <li>
      <div className={classNames("view", {"completed": completed})}>
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={(e) => handleCompleted(e)}
        />
        <label>{ title }</label>
        <button
          type="button"
          className="destroy"
          onClick={() => handleDeleteItem(id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
}
