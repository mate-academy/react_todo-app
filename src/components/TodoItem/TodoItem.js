import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({
  todo,
  editTodoId,
  showEditField,
  submitEditItem,
  setActive,
  deleteTodo,
  editTodo,
  onFocusChanged,
}) => {
  const [completed, setCompleted] = useState(false);
  const [editTask, setEditTask] = useState('');
  const fieldRef = useRef(null);

  const selectItem = () => {
    const status = !completed;

    setActive(todo.id, !status);

    setCompleted(status);
  };

  useEffect(() => () => fieldRef.current.focus());

  const destroyTodo = () => deleteTodo(todo.id);

  const inputChanged = event => setEditTask(event.target.value);

  const doubleClicked = (event, id) => {
    event.preventDefault();
    editTodo(id);
  };

  const dropChanges = (event) => {
    if (event.keyCode === 27) {
      onFocusChanged();
    }
  };

  const submitChanges = event => submitEditItem(event, editTask);

  return (
    <li
      className={`${todo.isActive ? '' : 'completed'}
      ${showEditField ? ' editing' : ''}`}
    >
      <div
        className="view"
        style={
          editTodoId === todo.id
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <input
          onChange={selectItem}
          type="checkbox"
          checked={!todo.isActive}
          className="toggle"
          id={`todo-${todo.id}`}
        />
        <label
          onClick={selectItem}
          htmlFor={`todo-${todo.id}`}
          onDoubleClick={event => doubleClicked(event, todo.id)}
        >
          {todo.task}
        </label>
        <button
          onClick={destroyTodo}
          type="button"
          className="destroy"
        />
      </div>
      <form onSubmit={submitChanges}>
        <input
          onBlur={submitChanges}
          className="edit"
          onKeyUp={dropChanges}
          ref={fieldRef}
          onChange={inputChanged}
          value={editTask}
          placeholder="What do you want to change?"
          style={
            editTodoId === todo.id
              ? { display: 'block' }
              : { display: 'none' }
          }
        />
      </form>
    </li>
  );
};

TodoItem.propTypes = {
  setActive: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    isActive: PropTypes.bool,
    task: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  showEditField: PropTypes.bool.isRequired,
  editTodoId: PropTypes.number,
  submitEditItem: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  onFocusChanged: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  editTodoId: null,
};

export default TodoItem;
