/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useEffect, useState, useRef } from 'react';
import { Todo } from '../../types/Todo';
import { useClickHook } from '../../UseClickHook/UseClickHook';
import { fetchSend, fetchDelete } from '../../api/fetchSend';

type Props = {
  todo: Todo;
  setListOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  listOfTodos: Todo[];
};

export const TodoItem: React.FC<Props> = (
  {
    todo, setListOfTodos, listOfTodos,
  },
) => {
  const [click, setClick] = useState('');
  const clickHook = useClickHook(click);

  const [completed, setCompleted] = useState(todo.completed);
  const [contentString, setContentString] = useState(todo.title);
  const [edit, setEdit] = useState(false);

  const editInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCompleted(todo.completed);
  }, [listOfTodos]);

  const patchHandler = () => {
    fetchSend('PATCH', contentString, completed, todo.id)
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
    if (clickHook === 'change') {
      patchHandler();
      setListOfTodos(prev => [...prev].map(el => {
        if (el.id === todo.id) {
          // eslint-disable-next-line no-param-reassign
          el.completed = !el.completed;
        }

        return el;
      }));
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

  const deleteHandler = () => {
    fetchDelete(todo.id)
      .then(res => {
        if (res.ok) {
          setListOfTodos(prev => [...prev].filter(el => el.id !== todo.id));
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(`${err.message}`);
      });
  };

  const emptyStringHandler = () => {
    if (contentString === '') {
      deleteHandler();
    } else {
      patchHandler();
    }
  };

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
            onClick={() => {
              deleteHandler();
            }}
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
            emptyStringHandler();
            setEdit(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              emptyStringHandler();

              setEdit(false);
            }
          }}
        />
      </li>
    </>
  );
};
