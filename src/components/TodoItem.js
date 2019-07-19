import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {
  let classes = ' ';

  if (props.todo.completed) {
    classes = 'completed';
  }

  if (props.todo.id === props.editingId) {
    classes += ' editing';
  }

  return (
    <li
      onDoubleClick={() => props.handleEdit(props.todo.id)}
      className={classes}
    >
      <div>
        <input
          type="checkbox"
          className="toggle"
          checked={props.todo.completed}
          onChange={() => props.handleItem(props.todo.id, 'completed')}
        />

        <label
          className="view"
          htmlFor="todo-1"
        >
          {props.todo.title}
        </label>

        <form onSubmit={props.handleSubmitEdit}>
          <input
            name="editInput"
            className="edit"
            type="text"
            value={props.todoEditValue}
            onChange={props.handleTypeEdit}
          />
        </form>

        <button
          onClick={() => props.handleItem(props.todo.id, 'destroy')}
          type="button"
          className="destroy"
        />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,

  handleItem: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,

  todoEditValue: PropTypes.string.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
  handleTypeEdit: PropTypes.func.isRequired,
  editingId: PropTypes.string.isRequired,
};

export default TodoItem;
