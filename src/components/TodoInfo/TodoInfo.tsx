import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Context } from '../../context';
import { Loader } from '../Loader/Loader';

type Props = {
  todo: Todo,
  isUpdating: boolean,
  isToggleAll: boolean,
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({
    todo,
    isUpdating,
    isToggleAll,
  }) => {
    const {
      onDelete,
      onTitleChange,
      onToggleStatus,
    } = useContext(Context);
    const { title, completed } = todo;
    const [todoTitle, setTodoTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const titleCheck = (newtitle: string) => {
      if (newtitle === '') {
        onDelete(todo.id);
        setIsEditing(false);
      }

      if (todo.title !== newtitle) {
        onTitleChange(todo.id, newtitle);
        setIsEditing(false);
      }

      setIsEditing(false);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      titleCheck(todoTitle);
    };

    const onBlur = () => {
      titleCheck(todoTitle);
    };

    const onDoubleClick = () => {
      setIsEditing(true);
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
        setTodoTitle(title);
      }
    };

    const handlerToggleStatus = () => {
      onToggleStatus(todo.id, !completed);
    };

    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
      }
    }, [isEditing]);

    return (
      <div className={classNames('todo', {
        completed,
      })}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={completed}
            onClick={handlerToggleStatus}
            readOnly
          />
        </label>

        {isEditing ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="todo__title-field"
              placeholder={title}
              value={todoTitle}
              onChange={(event) => {
                setTodoTitle(event.target.value);
              }}
              onBlur={onBlur}
              ref={inputRef}
              onKeyUp={onKeyUp}
            />
          </form>
        ) : (
          <>
            <span
              className="todo__title"
              onDoubleClick={onDoubleClick}
            >
              {todoTitle}
            </span>
            <button
              type="button"
              className="todo__remove"
              onClick={() => onDelete(todo.id)}
            >
              ×
            </button>
          </>

        )}

        <Loader isUpdating={isUpdating} isToggleAll={isToggleAll} />
      </div>
    );
  },
);
