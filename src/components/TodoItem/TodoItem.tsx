import React from 'react';
import classNames from 'classnames';
import { Todo } from '../CustomReducer/useCustomReducer';
import { Values } from '../Types/Values';

interface Props {
  item: Todo;
  data: Values;
}

export const TodoItem: React.FC<Props> = ({ item, data }) => {
  const { addCompleted, remove } = data;

  return (
    <li className={classNames({ completed: item.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${item.id}`}
          onChange={() => addCompleted(item.id)}
        />
        <label htmlFor={`toggle-view-${item.id}`}>{item.title}</label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => remove(item.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
