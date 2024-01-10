/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/todoType';
import { TodoContext } from '../todoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const activeTodo = todo;
  const [active, setActive] = useState(false);
  const { deleteTodo, setItemLeft, itemLeft } = useContext(TodoContext);

  const handleCheckbox = () => {
    if (!active) {
      activeTodo.completed = true;
      setActive(true);
      setItemLeft(itemLeft - 1);
    } else {
      activeTodo.completed = false;
      setActive(false);
      setItemLeft(itemLeft + 1);
    }
  };

  const isChecked = activeTodo.completed;

  return (
    <li className={classNames({ completed: activeTodo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={handleCheckbox}
          checked={isChecked}
        />
        <label htmlFor="toggle-view">{activeTodo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            deleteTodo(activeTodo.id);
          }}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
