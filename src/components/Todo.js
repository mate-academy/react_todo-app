import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../redux/actions';

const classNames = require('classnames');

const Todo = ({ todo, deleteTodo, completeTodo, changeTitle }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [title, setTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  const todoObject = useRef(null);

  useEffect(() => {
    todoObject.current.focus();
  }, [editing, todo, newTitle]);

  return (
    <li
      key={todo.id}
      className={classNames([
        { completed: todo.completed },
        { editing },
      ])}
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className={classNames([
            'toggle',
            { completed: todo.completed },
          ])}
          value={todo.completed}
          onChange={
            () => {
              completeTodo(todo.id);
            }
          }
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}
          className="label"
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        ref={todoObject}
        type="text"
        className="edit"
        value={newTitle}
        onChange={
          event => setNewTitle(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setEditing(false);
          }

          if (event.key === 'Escape') {
            setNewTitle(todo.title);
            setEditing(false);
          }
        }}
        onBlur={() => {
          if (newTitle.trim() !== '') {
            setTitle(newTitle);
            changeTitle(todo.id, newTitle);
          } else {
            setTitle(todo.title);
            setNewTitle(todo.title);
          }

          setEditing(false);
        }}
      />
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  deleteTodo: actions.deleteTodo,
  completeTodo: actions.completeTodo,
  changeTitle: actions.changeTitle,
};

export default connect(null, mapActionsToProps)(Todo);
