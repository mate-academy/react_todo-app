import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  state = {};

  render() {
    const {
      todo,
      handleCheckboxChange,
      handleDoubleClick,
      handleEditing,
      handleClickDestroy,
      handleLossFocus,
    } = this.props;

    return (
      <>
        <div className="View">
          <input
            defaultChecked={false}
            checked={todo.elementState.editing
              ? !todo.elementState.editing
              : todo.elementState.completed
            }
            onClick={() => handleCheckboxChange(todo.id)}
            type="checkbox"
            className="toggle"
            id={`todo-${todo.id}`}
          />
          <label
            onDoubleClick={() => handleDoubleClick(todo.id)}
          >
            {todo.elementState.editing ? '' : todo.text}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => handleClickDestroy(todo.id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          defaultValue={todo.text}
          onKeyDown={event => handleEditing(event, todo.id)}
          onBlur={event => handleLossFocus(event, todo.id)}
          // ref={}
        />
      </>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    elementState: PropTypes.shape({
      completed: PropTypes.bool,
      editing: PropTypes.bool,
    }),
  }).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleDoubleClick: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  handleClickDestroy: PropTypes.func.isRequired,
  handleLossFocus: PropTypes.func.isRequired,
};

export default TodoItem;
