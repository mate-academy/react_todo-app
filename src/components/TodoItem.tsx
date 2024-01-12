import { ChangeEvent, useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext } from '../state/State';

type Props = {
  todo: Todo,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { id, title, completed } = todo;
  const dispatch = useContext(DispatchContext);

  const handleChecbox = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked);

    dispatch({
      type: 'toggle',
      payload: {
        id,
        status: isCompleted,
      },
    });
  };

  const handleDelete = () => {
    dispatch({ type: 'delete', payload: id });
  };

  return (
    <li>
      <div className="view">
        <input
          type="checkbox"
          checked={isCompleted}
          className="toggle"
          id={`toggle-view-${id}`}
          onChange={handleChecbox}
        />
        <label
          htmlFor={`toggle-view-${id}`}
          style={{
            opacity: completed ? 0.5 : 1,
          }}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDelete}
        />
      </div>

      <input type="text" className="edit" />
    </li>
  );
};
