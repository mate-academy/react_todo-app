import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
  handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>) => void,
  changedTitleTodoId: number | null,
  handleEdit: (event: React.MouseEvent<HTMLLabelElement>) => void,
  newEditedTitle: string,
  handleInputChange:
  (event: React.ChangeEvent<HTMLInputElement>, param: string) => void,
  handleBlur: () => void,
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void,
}

export const TodoItem: React.FC<Props> = ({
  todo,
  handleToggle,
  handleDelete,
  changedTitleTodoId,
  handleEdit,
  newEditedTitle,
  handleInputChange,
  handleBlur,
  handleKeyDown,
}) => {
  const { id, title, completed } = todo;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [changedTitleTodoId]);

  return (
    <li
      key={id}
      className={classNames({ editing: changedTitleTodoId === id, completed })}
    >
      <div className="view">
        <input
          name={`${id}`}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleToggle}
          checked={completed}

        />
        <label
          id={`${id}`}
          title={title}
          onDoubleClick={handleEdit}
        >
          {title}
        </label>
        <button
          name={`${id}`}
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Mute volume"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newEditedTitle}
        ref={inputRef}
        onChange={(event) => handleInputChange(event, 'updateTittle')}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Empty todo will be deleted"
      />
    </li>
  );
};
