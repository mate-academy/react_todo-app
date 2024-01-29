/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const { deleteTodo, updateTodo } = useContext(TodoContext);
  const { title, id, completed } = todo;

  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);
  const editInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && editInput.current) {
      editInput.current.focus();
    }
  }, [editing]);

  const handleDeleteTodo = () => {
    deleteTodo(id);
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo({ ...todo, completed: event.target.checked });
  };

  const submitEditingTodo = () => {
    if (!newTitle.trim()) {
      deleteTodo(id);
    }

    updateTodo({
      ...todo,
      title: newTitle.trim(),
    });
    setEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
      setEditing(false);
    }

    if (event.key === 'Enter') {
      submitEditingTodo();
      setEditing(false);
    }
  };

  return (
    <li
      className={classNames({ completed, editing })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleChangeChecked}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={editInput}
        value={newTitle}
        onChange={handleTitleChange}
        onBlur={submitEditingTodo}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
});
