import classNames from 'classnames';
import { useState } from 'react';
import { Action } from '../enums/Action';
import { ActionType } from '../types/ActionType';
import { Todo } from '../types/Todo';
import { TodoEdit } from './TodoEdit';

type Props = {
  todo: Todo,
  dispatch: React.Dispatch<ActionType>,
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed }, dispatch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleStatusUpdate = () => {
    dispatch({
      type: Action.UPDATE,
      payload: [id, { completed: !completed }],
    });
  };

  return (
    <li
      data-cy="todo"
      className={classNames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={handleStatusUpdate}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="deleteTodo"
            onClick={() => dispatch({ type: Action.DELETE, payload: id })}
          >
            ×
          </button>
        </>
      ) : (
        <TodoEdit
          todoId={id}
          prevTitle={title}
          dispatch={dispatch}
          setIsEditing={setIsEditing}
        />
      )}
    </li>
  );
};
