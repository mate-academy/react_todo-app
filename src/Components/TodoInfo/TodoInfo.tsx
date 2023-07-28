/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../Types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
        />
        <label htmlFor="toggle-view">{todo.titleStorege}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
