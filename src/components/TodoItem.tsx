import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from './TodosContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;

  const dispatch = useContext(DispatchContext);

  const handleCompleted = () => {
    dispatch({ type: 'complete', payload: id });
  };

  const handleDelete = () => {
    dispatch({ type: 'delete', payload: id });
  };

  return (
    <li className={completed ? 'completed' : ''}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onClick={handleCompleted}
        />
        <label htmlFor="toggle-view">{title}</label>
        <button
          onClick={handleDelete}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
