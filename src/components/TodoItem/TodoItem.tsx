import React, { useContext } from 'react';
import classNames from 'classnames';
import { TodoContext } from '../TodoContext/TodoContext';
import Todo from '../../types/Todo';

interface Props {
  item: Todo;
}

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { deleteTodo, updateCompleteTodo } = useContext(TodoContext);

  const handleCompleted = () => {
    updateCompleteTodo(item.id);
  };

  const handleDeleteItem = () => {
    deleteTodo(item.id);
  };

  return (
    <li className={classNames({ completed: item.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${item.id}`}
          onChange={handleCompleted}
        />
        <label htmlFor={`toggle-view-${item.id}`}>{item.title}</label>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteItem}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
