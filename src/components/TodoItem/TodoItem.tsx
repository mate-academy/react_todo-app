import {
  useContext, useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    deleteTodo,
    editTodo,
    toggleCompleted,
  } = useContext(TodosContext);

  const { id, title, completed } = todo;

  const [isTodoEdit, setIsTodoEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [isTodoEdit]);

  function handleDoubleClick() {
    setIsTodoEdit(true);
    setEditTitle(title);
  }

  function handleEditSubmit() {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle) {
      editTodo(id, trimmedTitle);
      setIsTodoEdit(false);
    } else {
      deleteTodo(id);
    }
  }

  function handleEditCancel() {
    setIsTodoEdit(false);
    setEditTitle(title);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleEditSubmit();
    } else if (event.key === 'Escape') {
      handleEditCancel();
    }
  }

  return (
    <li
      className={classNames({ completed }, { editing: isTodoEdit })}
    >
      {!isTodoEdit ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${id}`}
            onChange={() => toggleCompleted(id)}
            checked={completed}
          />
          <label onDoubleClick={handleDoubleClick}>
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="deleteTodo"
            onClick={() => deleteTodo(id)}
          />
        </div>
      ) : (
        <input
          type="text"
          className="edit"
          ref={inputField}
          value={editTitle}
          placeholder="Empty todo will be deleted"
          onChange={(event) => setEditTitle(event.target.value)}
          onKeyUp={handleKeyDown}
          onBlur={handleEditSubmit}
        />
      )}
    </li>
  );
};
