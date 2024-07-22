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
  const {
    inputRef,
    removeTodo,
    changeTitle,
    ckiclEsc,
    switchEdited,
    todoCompleted,
    editTodo,
  } = useAppContextContainer();

  const handleClickDelete = () => {
    removeTodo(id);
    inputRef.current?.focus();
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    changeTitle(id, value);
  };

  const handlekeyUpClickEsc = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === `Escape`) {
      ckiclEsc(id, pastTitle);
    }
  };

  const handleBlurSwitch = () => {
    if (!title.length) {
      inputRef.current?.focus();

      return removeTodo(id);
    }

    switchEdited(id);
  };

  const handleSubmitNewTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.length) {
      return removeTodo(id);
    }

    return switchEdited(id);
  };

  const handleClickComplited = () => {
    todoCompleted(id);
  };

  const handleDbclickEdit = () => {
    setPastTitle(title);
    editTodo(id);
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
