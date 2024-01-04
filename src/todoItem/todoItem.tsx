/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/todoType';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <li className={classNames({ completed: checkbox })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={() => {
            setCheckbox(!checkbox);
          }}

        />
        <label htmlFor="toggle-view">{item.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            // eslint-disable-next-line
            console.log('here must go function that will delete the item');
          }}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
