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
import { Todo } from '../types/Todo';
import { DispatchContext } from '../store/TodosContextProvider';

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [editValue, setEditValue] = useState(todo.title);
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
        todoComplete: todo,
        newCompleted: event.target.checked,
      },
    });
  }, [todo, dispatch]);

  const handleEditing = useCallback(() => {
    if (editValue.trim()) {
      dispatch({
        type: 'changeTitle',
        payload: {
          todoToChange: todo,
          newTitle: editValue.trim(),
        },
      });
    } else {
      dispatch({
        type: 'deleteTodo',
        payload: todo,
      });
    }

    setIsEditing(false);
  }, [dispatch, todo, editValue]);

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
        setEditValue(todo.title);
        setIsEditing(false);
      }
    },
    [todo],
  );

  const onDeleteTodo = useCallback(() => {
    dispatch({ type: 'deleteTodo', payload: todo });
  }, [todo, dispatch]);

  const onEditInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEditValue(event.target.value);
    },
    [],
  );

  return (
    <li className={cn({
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
          onChange={onToggleChange}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
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
