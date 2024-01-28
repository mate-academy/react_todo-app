/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useRef, useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contexts/TodosProvider';
import { TodoAction } from '../../types/TodoAction';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = React.memo(
  ({ todo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const editInput = useRef<HTMLInputElement>(null);
    const { dispatch } = useContext(TodosContext);
    const { id, title, completed } = todo;
    const [editInputValue, setEditInputValue] = useState(title);
    const normalizedEditInputValue = editInputValue.trim();

    const handleTodoChanged = () => {
      if (normalizedEditInputValue !== title) {
        if (normalizedEditInputValue === '') {
          dispatch({
            action: TodoAction.Delete,
            todo,
          });
        } else {
          dispatch({
            action: TodoAction.Update,
            todo: {
              ...todo,
              title: normalizedEditInputValue,
            },
          });

          setEditInputValue(normalizedEditInputValue);
        }
      }

      setIsEditing(false);
    };

    const keyboardListener = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          setIsEditing(false);
          setEditInputValue(title);

          document.removeEventListener('keyup', keyboardListener);
          break;
        case 'Enter':
          handleTodoChanged();
          document.removeEventListener('keyup', keyboardListener);
          break;
        default:
      }
    };

    const handleBlur = () => {
      window.setTimeout(() => {
        if (isEditing) {
          handleTodoChanged();
        }
      }, 5);
    };

    const onEditing = () => {
      if (!isEditing) {
        setIsEditing(true);
        document.addEventListener('keyup', keyboardListener);

        window.setTimeout(() => editInput.current?.focus(), 5);
      }
    };

    const handleDblclick = useDebounce(onEditing, 300);

    if (isEditing) {
      document.removeEventListener('keyup', keyboardListener);
      document.addEventListener('keyup', keyboardListener);
    }

    return (
      <li className={cn({
        completed,
        editing: isEditing,
      })}
      >
        <div className="view">
          <input
            checked={completed}
            type="checkbox"
            className="toggle"
            id={`toggle-view${id}`}
            onChange={() => dispatch({
              action: TodoAction.Update,
              todo: { ...todo, completed: !todo.completed },
            })}
          />
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
          <label onClick={handleDblclick}>
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => dispatch({
              action: TodoAction.Delete,
              todo,
            })}
          />
        </div>
        <input
          ref={editInput}
          value={editInputValue}
          onChange={event => setEditInputValue(event.target.value)}
          onBlur={handleBlur}
          type="text"
          className="edit"
        />
      </li>
    );
  },
);
