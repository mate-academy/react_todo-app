/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useItem } from '../hooks/TodoItemHooks';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;
  const {
    handleCheckbox,
    callEditTitle,
    handleDelete,
    editFlag,
    query,
    handleTextInput,
    handleSubmit,
    cancelSubmit,
  } = useItem(title, completed, id);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          onChange={handleCheckbox}
          className="todo__status"
          checked={completed}
        />
      </label>
      {!editFlag ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={callEditTitle}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} onKeyUp={cancelSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={handleTextInput}
            onBlur={handleSubmit}
            autoFocus
          />
        </form>
      )}
    </div>
  );
};
