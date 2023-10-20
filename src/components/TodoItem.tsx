/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { ActionType } from '../types/Action';
import { DispatchContext } from '../states/TodosContext';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { id, title, completed } = todo;
  const [newContent, setNewContent] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const editInput = useRef<HTMLInputElement>(null);

  const toggleTodo = useCallback((todoId: number) => {
    dispatch({
      type: ActionType.ToggleCheck,
      payload: { id: todoId },
    });
  }, [dispatch]);

  const deleteTodo = useCallback((todoId: number) => {
    dispatch({
      type: ActionType.Remove,
      payload: { id: todoId },
    });
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    if (newContent !== '') {
      dispatch({
        type: ActionType.Update,
        payload: {
          id,
          content: newContent,
        },
      });
    }

    if (newContent === '') {
      dispatch({
        type: ActionType.Remove,
        payload: {
          id,
        },
      });
    }

    setIsEditing(false);
  }, [dispatch, id, newContent]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNewContent(title);
        setIsEditing(false);
      }

      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    document.addEventListener('keyup', handleEscape);

    return () => {
      document.removeEventListener('keyup', handleEscape);
    };
  }, [handleSubmit, title]);

  useEffect(() => {
    if (editInput.current) {
      editInput.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => toggleTodo(id)}
          checked={completed}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editInput}
        value={newContent}
        onChange={event => setNewContent(event.target.value)}
        onBlur={handleSubmit}
      />
    </li>
  );
};
