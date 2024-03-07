/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleOnToggle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'complete',
        payload: {
          todoComplete: todo,
          newCompleted: event.target.checked,
        },
      });
    },
    [todo, dispatch],
  );

  const handleDeleteTodo = () => {
    dispatch({ type: 'delete', payload: todo });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(event.target.value);
  };

  const handleEditSave = () => {
    const trimmedValue = editValue.trim();

    if (trimmedValue) {
      dispatch({
        type: 'edit',
        payload: {
          todoToChange: todo,
          newTitle: trimmedValue,
        },
      });
    } else {
      handleDeleteTodo();
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEditSave();
      setIsEditing(false);
    }

    if (event.key === 'Escape') {
      setEditValue(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          name="toggle-view"
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleOnToggle}
        />
        <label onDoubleClick={() => setIsEditing(true)}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editValue}
        ref={inputRef}
        onChange={handleInputChange}
        onBlur={handleEditSave}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
};
