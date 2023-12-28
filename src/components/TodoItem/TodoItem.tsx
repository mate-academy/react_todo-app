/* eslint-disable jsx-a11y/control-has-associated-label */

import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext } from '../../store/GlobalContextProvider';

interface Props {
  item: Todo;
  key?: React.Key;
}

export const TodoItem: React.FC<Props> = React.memo(({ item }) => {
  const dispatch = useContext(DispatchContext);
  const [editValue, setEditValue] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false);

  const editField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editField.current && isEditing) {
      editField.current.focus();
    }
  }, [isEditing]);

  const onToggleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'toggleTodo',
      payload: {
        todoToComplete: item,
        newCompleted: event.target.checked,
      },
    });
  }, [item, dispatch]);

  const handleEditing = useCallback(() => {
    if (editValue.trim()) {
      dispatch({
        type: 'changeTitle',
        payload: {
          todoToChange: item,
          newTitle: editValue.trim(),
        },
      });
    } else {
      dispatch({
        type: 'deleteTodo',
        payload: item,
      });
    }

    setIsEditing(false);
  }, [dispatch, item, editValue]);

  const onEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleEditing();
      }
    },
    [handleEditing],
  );

  const onEscape = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setEditValue(item.title);
        setIsEditing(false);
      }
    },
    [item],
  );

  const onDeleteTodo = useCallback(() => {
    dispatch({ type: 'deleteTodo', payload: item });
  }, [item, dispatch]);

  const onEditInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEditValue(event.target.value);
    },
    [],
  );

  return (
    <li className={cn({
      completed: item.completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          name="toggle-view"
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={item.completed}
          onChange={onToggleChange}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => setIsEditing(true)}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={onDeleteTodo}
        />
      </div>
      <input
        name="text"
        type="text"
        className="edit"
        value={editValue}
        onBlur={handleEditing}
        ref={editField}
        onChange={onEditInputChange}
        onKeyDown={onEnter}
        onKeyUp={onEscape}
      />
    </li>
  );
});
