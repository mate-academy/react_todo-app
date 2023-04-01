import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo;
  onToggle: (id: number, status: boolean) => void
  onRemove: (id: number) => void
  onUpdateList: (id: number, key: string, value: string | boolean) => void
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
  onToggle,
  onRemove,
  onUpdateList,
}) => {
  const { title, completed, id } = todo;
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [value, setValue] = useState(title);

  const handleKeyUp = (key: string) => {
    if (key === 'Enter' && !value.length) {
      onRemove(id);
    }

    if (key === 'Enter') {
      setNewTitle(value);
      onUpdateList(id, 'title', value);
      setEdit(false);
    }

    if (key === 'Escape') {
      setValue(newTitle);
      onUpdateList(id, 'title', value);
      setEdit(false);
    }
  };

  const handleBlur = () => {
    if (!value.length) {
      onRemove(id);
    }

    setNewTitle(value);
    onUpdateList(id, 'title', value);
    setEdit(false);
  };

  return (
    <li
      className={classNames('',
        {
          // eslint-disable-next-line quote-props
          'completed': (completed === true && edit === false),
          // eslint-disable-next-line quote-props
          'editing': edit,
        })}
      onDoubleClick={() => setEdit(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${id}`}
          checked={completed}
          onChange={event => {
            onToggle(id, event.target.checked);
          }}
        />
        <label htmlFor={`toggle-view-${id}`}>{newTitle}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => onRemove(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={value}
        onBlur={handleBlur}
        onChange={(event) => setValue(event.target.value)}
        onKeyUp={(event) => handleKeyUp(event.key)}
      />
    </li>
  );
});
