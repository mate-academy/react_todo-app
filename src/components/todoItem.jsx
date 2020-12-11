import React, { useEffect, useState } from 'react';
import { commonProps, todoShape } from './props';
import '../styles/todo-list.css';

export const TodoItem = ({
  todo,
  toggleAll,
  changeToggle,
  destroyTodo,
  filter,
  changeTitle,
}) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [editable, setEditable] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  useEffect(() => {
    setCompleted(toggleAll);

    if (toggleAll) {
      changeToggle(todo.id, true);
    } else {
      changeToggle(todo.id, false);
    }
  }, [toggleAll]);

  const hiddenItem = () => {
    switch (filter) {
      case 'Completed':
        return !completed;
      case 'Active':
        return completed;
      default:
        return false;
    }
  };

  const handleChange = () => {
    setCompleted(!completed);
    changeToggle(todo.id, !completed);
  };

  const handleEdit = (event) => {
    const { value } = event.target;

    setEditTitle(value);
  };

  const saveChanges = (ev) => {
    if (ev.key === 'Enter' && editTitle) {
      lostFocus();
    }

    if (ev.key === 'Escape') {
      setEditable(false);
      setEditTitle(todo.title);
    }
  };

  const classNameLi = (status) => {
    if (editable) {
      return 'editing';
    }

    return status ? 'completed' : '';
  };

  const lostFocus = () => {
    changeTitle(todo.id, editTitle);
    setEditable(false);
  };

  return (
    <li
      key={todo.id}
      className={classNameLi(completed)}
      hidden={hiddenItem()}
      onDoubleClick={() => setEditable(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={handleChange}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          name={todo.id}
          className="destroy"
          onClick={destroyTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editTitle}
        onChange={handleEdit}
        onKeyDown={saveChanges}
        onBlur={lostFocus}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: todoShape.isRequired,
  ...commonProps,
};
