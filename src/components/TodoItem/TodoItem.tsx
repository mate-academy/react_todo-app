/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../interfaces/Todo';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { id, title, completed } = item;
  const [completedStatus, setCompletedStatus] = useState(completed);

  return (
    <li className={cn({ completed: completedStatus === true })}>
      {/* className="editing" */}
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id.toString()}
          onChange={() => setCompletedStatus(!completedStatus)}
        />
        <label htmlFor="toggle-view">{title}</label>
        <button type="button" className="destroy" data-cy="deleteTodo" />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
