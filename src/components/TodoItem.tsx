import classNames from 'classnames';
import { useState } from 'react';
import { Action } from '../enums/Action';
import { Todo } from '../types/Todo';
import { TodoEdit } from './TodoEdit';

type Props = {
  todo: Todo,
  dispatch: React.Dispatch<{ type: Action, payload?: unknown }>,
};

export const TodoItem: React.FC<Props> = ({
  todo: { id, title, completed }, dispatch,
}) => {
  const [isEditing, setIsEditing] = useState(false);

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
          onClick={() => dispatch({
            type: Action.UPDATE,
            payload: [id, { completed: !completed }],
          })}
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
