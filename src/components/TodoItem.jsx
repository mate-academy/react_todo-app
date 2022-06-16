import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import {
  changeTodoStatus,
  changeTodoTitle,
  deleteTodo,
} from '../features/todos/todosSlice';

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const inputEl = useRef(null);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleChangeStatus = () => {
    dispatch(changeTodoStatus(todo.id));
  };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setTitle(todo.title);
      inputEl.current?.blur();
    }
  }, [todo]);

  const handleEditTodoTitle = (target) => {
    setEditing(true);
    document.addEventListener('keyup', escFunction);
    requestAnimationFrame(() => {
      inputEl.current?.focus();
    });
  };

  const onBlurInput = () => {
    if (title.trim().length) {
      dispatch(changeTodoTitle({ id: todo.id, title }));
    } else {
      dispatch(deleteTodo(todo.id));
    }

    setEditing(false);
    document.removeEventListener('keyup', escFunction);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      inputEl.current?.blur();
    }
  };

  return (
    <li
      className={classNames(
        'todo-item',
        { completed: todo.completed === true },
        { editing },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleChangeStatus}
        />
        <label
          onDoubleClick={event => handleEditTodoTitle(event.target)}
        >
          {todo.title}
        </label>
        <button type="button" className="destroy" onClick={handleDelete} />
      </div>
      <input
        type="text"
        className="edit"
        id="editTodo"
        ref={inputEl}
        value={title}
        onChange={event => setTitle(event.target.value)}
        onBlur={onBlurInput}
        onKeyPress={handleEnterPress}
      />
    </li>
  );
};

export default TodoItem;
