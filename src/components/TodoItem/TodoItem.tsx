import React, {
  useContext, useEffect, useState, useRef,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed, id } = todo;

  const todoContext = useContext(TodosContext);
  const { toggleTodo, deleteTodo, editingTodo } = todoContext;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handlerToggleTodo = () => {
    toggleTodo(id);
  };

  const handlerDeleteTodo = () => {
    deleteTodo(id);
  };

  const handlerEdit = () => {
    setIsEditing(true);
  };

  const handlerEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handlerEditSubmit = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle !== '') {
      setEditedTitle(trimmedTitle);
      setIsEditing(false);
      editingTodo(id, trimmedTitle);
    } else {
      deleteTodo(id);
    }
  };

  const handlerEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handlerKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handlerEditSubmit();
    } else if (event.key === 'Escape') {
      handlerEditCancel();
    }
  };

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={classNames({
      completed,
      editing: isEditing,
    })}
    >
      {!isEditing ? (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-${id}`}
            checked={completed}
            onChange={handlerToggleTodo}
          />

          <label onDoubleClick={handlerEdit}>
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="deleteTodo"
            onClick={handlerDeleteTodo}
          />
        </div>
      ) : (
        <input
          type="text"
          ref={inputField}
          className="edit"
          value={editedTitle}
          placeholder="Empty todo will be deleted"
          onChange={handlerEditChange}
          onBlur={handlerEditSubmit}
          onKeyUp={handlerKeyUp}
        />
      )}
    </li>
  );
};
