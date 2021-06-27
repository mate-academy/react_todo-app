import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../redux/actions';

const Todo = ({ todo, deleteTodo, completeTodo, changeTitle }) => {
  const [newTitle, setNewTitle] = useState(todo.title);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    document.getElementById(`${todo.id}-edit`).focus();
  }, [editing, todo]);

  return (
    <li
      key={`${todo.id}-key`}
      className={
        `${todo.completed
          ? 'completed'
          : ''
        } ${editing
          ? 'editing'
          : ''
        }`
      }
    >
      <div className="view">
        <input
          checked={todo.completed}
          type="checkbox"
          className={`toggle ${todo.completed ? 'completed' : ''}`}
          value={todo.completed}
          onChange={
            (event) => {
              completeTodo(todo.id, !todo.completed);
            }
          }
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
      <input
        id={`${todo.id}-edit`}
        type="text"
        className="edit"
        value={newTitle}
        onChange={
          event => setNewTitle(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            changeTitle(changeTitle(todo.id, newTitle));
            setEditing(false);
          }

          if (event.key === 'Escape') {
            setNewTitle(todo.title);
            setEditing(false);
          }
        }
        }
        onBlur={(event) => {
          changeTitle(todo.id, newTitle);
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
