/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
        />
        <label htmlFor="toggle-view">
          {todo.title}
        </label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </>
  );
};
