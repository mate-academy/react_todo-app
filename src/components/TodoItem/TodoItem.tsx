import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  deleteTodo: (todoId: number) => void,
  changeCheckbox: (id: number, value: boolean) => void,
  changeTitle: (id: number, newTitle: string) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  changeCheckbox,
  changeTitle,
}) => {
  const { id, title, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(title);

  const onDeleteTodo = () => {
    deleteTodo(id);
  };

  const onChangeCheckbox = () => {
    changeCheckbox(id, completed);
  };

  const onEditTitle = () => {
    setIsEditing(true);
  };

  const handleChangeTitleBlur = () => {
    if (titleEdit === '') {
      deleteTodo(id);

      return;
    }

    if (title !== titleEdit) {
      changeTitle(id, titleEdit);
    }

    setIsEditing(false);
  };

  const onChangeTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEdit(event.target.value);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setTitleEdit(title);
    }

    if (e.key === 'Enter' || e.key === '') {
      handleChangeTitleBlur();
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={onChangeCheckbox}
        />
        <label
          onDoubleClick={onEditTitle}
        >
          {title}
        </label>
        <button
          type="button"
          aria-label="delete-button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={onDeleteTodo}
        />
      </div>
      {isEditing
        && (
          <input
            type="text"
            className="edit"
            placeholder="Edit todo"
            value={titleEdit}
            onChange={onChangeTitleInput}
            onBlur={handleChangeTitleBlur}
            onKeyUp={handleKeyUp}
          />
        )}
    </li>
  );
};
