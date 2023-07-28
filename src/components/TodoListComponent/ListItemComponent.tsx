/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useContext, useState } from 'react';
import classNames from 'classnames';

import { TodoType } from '../../types/TodoType';
import { AppContext } from '../../context';
import { Types } from '../../reducer';

type Props = {
  todo: TodoType;
};

export const ListItemComponent: React.FC<Props> = ({ todo }) => {
  const { dispatch } = useContext(AppContext);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const deleteTodo = useCallback(
    (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      dispatch({
        type: Types.Delete,
        payload: {
          id: todo.id,
        },
      });
    }, [],
  );

  const todoToEdit: TodoType = {
    id: todo.id,
    title: newTodoTitle,
    completed: todo.completed,
  };

  const editingTodoCompleted = () => {
    if (!newTodoTitle.trim()) {
      dispatch({
        type: Types.Delete,
        payload: {
          id: todo.id,
        },
      });
      setIsEditing(false);

      return;
    }

    dispatch({
      type: Types.Edit,
      payload: {
        todoToEdit,
      },
    });
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setNewTodoTitle(todo.title);
  };

  // eslint-disable-next-line max-len
  const handleToggleChange = useCallback(() => {
    dispatch({
      type: Types.ToggleCompleted,
      payload: {
        id: todo.id,
      },
    });
  }, []);

  return (
    <li className={classNames(
      { completed: todo.completed && !isEditing },
      { editing: isEditing },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          checked={todo.completed}
          className="toggle"
          id={`${todo.id}`}
          onChange={handleToggleChange}
        />
        <label
          onDoubleClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              document.getElementById(`${todo.id}_edit`)?.focus();
            }, 0);
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>
      <input
        type="text"
        id={`${todo.id}_edit`}
        className="edit"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value.trim())}
        onBlur={editingTodoCompleted}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            editingTodoCompleted();
          }

          if (e.key === 'Escape') {
            cancelEditing();
          }
        }}
      />
    </li>
  );
};
