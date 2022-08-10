/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  setlistOfTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoItem: React.FC<Props>
= (
  {
    todo,
    setlistOfTodos,
  },
) => {
  const [edit, setEdit] = useState(false);
  const [newInput, setNewInput] = useState(todo.body);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const handleDelete = () => {
    setlistOfTodos(prev => [...prev].filter(el => el.id !== todo.id));
  };

  const checkhandle = () => {
    setlistOfTodos(prev => {
      return [...prev].map(el => {
        if (el.id === todo.id) {
          // eslint-disable-next-line no-param-reassign
          el.completed = !el.completed;
        }

        return el;
      });
    });
  };

  const saveEdits = () => {
    setlistOfTodos(prev => [...prev].map((el) => {
      if (el.id === todo.id) {
        // eslint-disable-next-line no-param-reassign
        el.body = newInput;
      }

      return el;
    }));
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newInput === '') {
        handleDelete();
      }

      saveEdits();
      setEdit(false);
    } else {
      saveEdits();
    }
  };

  useEffect(() => {
    if (inputRef.current && edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  return (
    <>
      <li
        className={
          classNames({ completed: todo.completed && !edit },
            { editing: edit })
        }
      >
        <div
          className="view"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            className="toggle"
            id={`toggle-completed-${todo.id}`}
            onChange={() => {
              checkhandle();
            }}
          />
          <label
            htmlFor={`toggle-completed-${todo.id}`}
            onDoubleClick={() => {
              setEdit(true);
            }}
          >
            {todo.body}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => {
              handleDelete();
            }}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="edit"
          onChange={e => {
            setNewInput(e.target.value);
          }}
          value={newInput}
          onKeyDown={(e) => {
            keyDownHandler(e);
          }}
          onBlur={(e) => {
            if (e.target.value === '') {
              handleDelete();
            }

            saveEdits();
            setEdit(false);
          }}
        />
      </li>
    </>
  );
};
