/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import cn from 'classnames';
import { DispatchContext, Todo } from '../../store';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const [editing, setEditing] = useState(false);

  const editingInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingInput.current) {
      editingInput.current.value = todo.title;
      editingInput.current?.focus();
    }
  }, [editing]);

  const checkboxHandler = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => dispatch({
    type: 'change-completeness',
    todo,
    completeness: event.target.checked,
  }), []);

  const deleteHandler = useCallback(() => dispatch({
    type: 'delete',
    todo,
  }), []);

  const editingHandler = useCallback((
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setEditing(false);
    }

    if (event.key === 'Enter') {
      dispatch({
        type: 'edit',
        value: event.target.value,
        todo,
      });
      setEditing(false);
    }
  }, []);

  const blurEditingHandler = useCallback((
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    dispatch({
      type: 'edit',
      value: event.target.value,
      todo,
    });
    setEditing(false);
  }, []);

  return (
    <li className={cn({
      completed: todo.completed,
      editing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${todo.id}`}
          onChange={checkboxHandler}
          checked={todo.completed}
        />
        <label
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteHandler}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editingInput}
        onKeyUp={editingHandler}
        onBlur={blurEditingHandler}
      />
    </li>
  );
});
