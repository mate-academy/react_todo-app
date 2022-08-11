/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { Todo } from '../../types/Todo';
import { useClickHook } from '../../UseClickHook/UseClickHook';
import { fetchPatch } from '../../api/fetchPatch';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [click, setClick] = useState('');
  const clickHook = useClickHook(click);

  const [completed, setCompleted] = useState(todo.completed);
  const [contentString, setContentString] = useState(todo.title);
  const [edit, setEdit] = useState(false);

  const editInputRef = useRef<HTMLInputElement | null>(null);

  const patchHandler = () => {
    fetchPatch(contentString, completed, todo.id)
      .then(res => {
        if (res?.title === undefined) {
          setCompleted(prev => !prev);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(`${err.message}`);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('clickHook', clickHook);

    if (clickHook === 'change') {
      patchHandler();
    }

    if (clickHook === 'dblclick') {
      setEdit(true);
    }

    setClick('');
  }, [clickHook]);

  useEffect(() => {
    if (edit && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [edit]);

  return (
    <>
      <li className={classNames({ completed }, { editing: edit })}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-completed-${todo.id}`}
            onChange={(e) => {
              setClick(e.type);
              setCompleted(prev => !prev);
            }}
            checked={completed}
          />
          <label
            htmlFor={`toggle-completed-${todo.id}`}
            onDoubleClick={(e) => {
              setClick(e.type);
            }}
          >
            {contentString}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
          />
        </div>
        <input
          ref={editInputRef}
          type="text"
          className="edit"
          onChange={(e) => {
            setContentString(e.target.value);
          }}
          value={contentString}
          onBlur={() => {
            setEdit(false);
            patchHandler();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEdit(false);
              patchHandler();
            }
          }}
        />
      </li>
    </>
  );
};
