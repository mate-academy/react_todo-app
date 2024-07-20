import { Todo } from '../../types/todo';
import { useAppContextContainer } from '../../context/AppContext';
import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  todo: Todo;
};

const TodoListInfo = ({ todo }: Props) => {
  const { id, title, completed, isEdited } = todo;
  const [pastTitle, setPastTitle] = useState<string>('');
  const { setTodos, inputRef } = useAppContextContainer();

  const handleClickDelete = () => {
    setTodos(prev => prev.filter(el => el.id !== id));
    inputRef.current?.focus();
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, title: value };
        }

        return el;
      }),
    );
  };

  const handlekeyUpClickEsc = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === `Escape`) {
      setTodos(prev =>
        prev.map(el => {
          if (id === el.id) {
            return { ...el, title: pastTitle, isEdited: false };
          }

          return el;
        }),
      );
    }
  };

  const handleBlurSwitch = () => {
    if (!title.length) {
      inputRef.current?.focus();

      return setTodos(prev => prev.filter(el => el.id !== id));
    }

    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, isEdited: false, title: el.title.trim() };
        }

        return el;
      }),
    );
  };

  const handleSubmitNewTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.length) {
      return setTodos(prev => prev.filter(el => el.id !== id));
    }

    return setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, isEdited: false, title: el.title.trim() };
        }

        return el;
      }),
    );
  };

  const handleClickComplited = () => {
    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, completed: !el.completed };
        }

        return el;
      }),
    );
  };

  const handleDbclickEdit = () => {
    setPastTitle(title);

    setTodos(prev =>
      prev.map(el => {
        if (id === el.id) {
          return { ...el, isEdited: true };
        }

        return el;
      }),
    );
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={handleClickComplited}
          checked={completed}
        />
      </label>

      {isEdited ? (
        <form onSubmit={handleSubmitNewTitle} onKeyUp={handlekeyUpClickEsc}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={handleChangeTitle}
            onBlur={handleBlurSwitch}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDbclickEdit}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleClickDelete}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default TodoListInfo;
