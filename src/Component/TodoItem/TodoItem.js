import React from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  inputText = React.createRef();

  componentDidUpdate() {
    if (this.inputText.current) {
      this.inputText.current.focus();
    }
  }

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
      <div>
        {!todo.elementState.editing
          ? (
            <div className="View">
              <input
                checked={todo.elementState.completed}
                onChange={() => handleCheckboxChange(todo.id)}
                type="checkbox"
                className="toggle"
                id={`todo-${todo.id}`}
              />
              <label
                onDoubleClick={() => {
                  handleDoubleClick(todo.id);
                }}
              >
                {todo.text}
              </label>
              <button
                type="button"
                className="destroy"
                onClick={() => handleClickDestroy(todo.id)}
              />
            </div>
          )
          : (
            <input
              type="text"
              className="edit"
              defaultValue={todo.text}
              onKeyDown={event => handleEditing(event, todo.id, todo.text)}
              onBlur={event => handleLossFocus(event, todo.id)}
              ref={this.inputText}
            />
          )
        }
      </div>
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
