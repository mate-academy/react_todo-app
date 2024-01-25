import classNames from 'classnames';
import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../contextes/TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { setTodos } = useContext(TodosContext);

  const {
    id,
    title,
    completed,
  } = todo;

  const [editedTitle, setEditedTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const onSubmitChanges = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!editedTitle.trim()) {
      setTodos(currentTodos => currentTodos
        .filter(currentTodo => currentTodo.id !== id));
    }

    if (editedTitle.trim()) {
      setIsEditing(false);
      setTodos(currentTodos => currentTodos
        .map(currentTodo => (currentTodo.id === id
          ? ({ ...currentTodo, title: editedTitle })
          : currentTodo)));
    }
  };

  const cancelChanges = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  const handlerInputChange = () => setTodos(currentTodos => currentTodos
    .map(currentTodo => (currentTodo.id === id
      ? ({ ...currentTodo, completed: !completed })
      : currentTodo)));

  const handlerKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmitChanges(event);
    } else if (event.key === 'Escape') {
      cancelChanges();
    }
  };

  const hendlerClick = () => setTodos(currentTodos => currentTodos
    .filter(currentTodo => currentTodo.id !== id));

  return (
    <li
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
          onChange={handlerInputChange}
        />
        <label
          onDoubleClick={() => setIsEditing(true)}
        >
          {title}
        </label>
        <button
          onClick={hendlerClick}
          aria-label="toggle-view"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
        />
      </div>
      <input
        placeholder="Empty todo will be deleted"
        onBlur={onSubmitChanges}
        ref={titleField}
        onKeyUp={handlerKeyUp}
        value={editedTitle}
        onChange={(event) => setEditedTitle(event.target.value)}
        type="text"
        className="edit"
      />
    </li>
  );
};
