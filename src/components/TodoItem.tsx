/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';

import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  const handleToggleViewChange = () => {

  };

  const handleDestroyClick = () => {

  };

  return (
    <li data-id={id} className={cn({ completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleToggleViewChange}
        />
        <label htmlFor="toggle-view">{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDestroyClick}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
