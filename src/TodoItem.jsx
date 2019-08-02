import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
state = {
  text: this.props.todo.text,
  isEditing: false,
}

handleTodoInput = (event) => {
  this.setState({
   text: event.target.value.replace(/[^ \wа-яА-ЯІіЇїЁё]/g, ''),
  });
};

changeEditModeByKey = (event) => {
  if (event.key === 'Enter') {
    this.setState({
      isEditing: false,
    });
  }
};

changeEditMode = () => {
  this.setState(prevState => ({
    isEditing: !prevState.isEditing,
  }));
}

  render() {
    const {
      todo,
      handleDelete,
      handleComplete,
          } = this.props;

    const {
      isEditing,
      text
          } = this.state;

    return (
      <ul className="todo-list">
      <li  className={todo.completed ? 'completed' : 'editing'}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={() => handleComplete(todo.id)}
            checked={todo.completed}
          />
          {isEditing ? (
            <input
              type="text"
              className="edit"
              value={text}
              onChange={this.handleTodoInput}
              onKeyPress={this.changeEditModeByKey}
              autoFocus
              ref={this.inputRef}
              onBlur={this.changeEditMode}
            />
            ) : (
            <label
              htmlFor="todo"
              onDoubleClick={() => this.setState ({
                isEditing: true,
              })}>
              {text}
            </label>)}
            <button
              type="button"
              className="destroy"
              onClick={() => handleDelete(todo.id)}
            />
        </div>
      </li>
    </ul>
    )
  };
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
};

export default TodoItem;
