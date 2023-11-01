import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { DispatchContext } from '../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { id, title, completed } = todo;

  const dispatch = useContext(DispatchContext);
  const [isEditing, setIsEditing] = useState(false);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && isEditing) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    dispatch({
      type: 'complete',
      id,
    });
  };

  const edit = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    dispatch({
      type: 'edit',
      id,
      title: event.target.value,
    });
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  const deleteTodo = () => {
    dispatch({
      type: 'delete',
      id,
    });
  };

  return (
    <li className={classNames({
      completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={handleClick}
        />

        <label onDoubleClick={() => setIsEditing(true)}>{title}</label>

        <button
          type="button"
          aria-label="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>

      <input
        ref={titleField}
        type="text"
        className="edit"
        onChange={edit}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
        value={title}
      />
    </li>
  );
});
