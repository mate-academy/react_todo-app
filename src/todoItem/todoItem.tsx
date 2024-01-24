/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/todoType';
import { TodoContext } from '../todoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const activeTodo = todo;
  const {
    deleteTodo,
    setItemLeft,
    itemLeft,
    setTodos,
    todos,
  } = useContext(TodoContext);
  const [editing, setEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(activeTodo.title);

  const inputFocus = useRef<HTMLInputElement>(null);

  const handleCheckbox = () => {
    if (!activeTodo.completed) {
      activeTodo.completed = true;
      setItemLeft(itemLeft - 1);
      setTodos(todos);
    } else {
      activeTodo.completed = false;
      setItemLeft(itemLeft + 1);
      setTodos(todos);
    }
  };

  const isChecked = activeTodo.completed;

  useEffect(() => {
    if (editing && inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [editing]);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleEdit(event.target.value);
  };

  const handleKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (!titleEdit.length) {
        return deleteTodo(activeTodo.id);
      }

      activeTodo.title = titleEdit;
      setEditing(false);
    }

    if (event.key === 'Escape') {
      setEditing(false);
      setTitleEdit(activeTodo.title);
    }

    return setTodos(todos);
  };

  const handleBlur = () => {
    setEditing(false);
    if (!titleEdit.length) {
      return deleteTodo(activeTodo.id);
    }

    activeTodo.title = titleEdit;

    return setTodos(todos);
  };

  return (
    <li className={classNames({
      completed: activeTodo.completed,
      editing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onClick={handleCheckbox}
          checked={isChecked}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={handleDoubleClick}
        >
          {activeTodo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            deleteTodo(activeTodo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={inputFocus}
        value={titleEdit}
        onChange={handleEdit}
        onKeyUp={handleKey}
        onBlur={handleBlur}
      />
    </li>
  );
};
