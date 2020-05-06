import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.inputText = React.createRef();
  }

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
      <li
        className={classNames(todo.elementState)}
        key={todo.id}
      >
        {todo.elementState.editing === false
          ? (
            <div className="View">
              <input
                defaultChecked={false}
                checked={todo.elementState.completed}
                onClick={() => handleCheckboxChange(todo.id)}
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
      </li>
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
