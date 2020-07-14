import React from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends React.Component {
  state = {
    editing: false,
    title: this.props.title,
  };

  editInput = React.createRef();

  // todo: set focus for editing input - maybe needs refactor
  componentDidUpdate() {
    this.editInput.current.focus();
  }

  handleDoubleClick = () => {
    this.setState({
      editing: !this.props.completed,
    });
  };

  handleTodoChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleTodoChangeImplementation = (event) => {
    if (event.key === 'Enter') {
      this.saveTodo();
    } else if (event.key === 'Escape') {
      this.cancelTodoEditing();
    }
  };

  saveTodo = () => {
    this.setState((prevState) => {
      this.props.handleTitleChange(this.props.todoIndex, prevState.title);

      return {
        editing: false,
      };
    });
  };

  cancelTodoEditing = () => {
    this.setState({
      editing: false,
      title: this.props.title,
    });
  };

  render() {
    const { title, editing } = this.state;
    const { completed, handleStatusChange, handleTodoRemove } = this.props;

    return (
      <li
        className={`${
          (completed && 'completed') || (editing && 'editing') || ''
        }`}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            // id={`todo-${this.props.id}`}
            checked={completed}
            onChange={handleStatusChange}
          />
          <label
            // todo onclick preventDefault causes lint errors -_-
            // htmlFor={`todo-${this.props.id}`}
            // onClick={(event) => {
            //   event.preventDefault();
            // }}
            onDoubleClick={this.handleDoubleClick}
          >
            {this.props.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={handleTodoRemove}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={title}
          onChange={this.handleTodoChange}
          onKeyDown={this.handleTodoChangeImplementation}
          onBlur={this.saveTodo}
          ref={this.editInput}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  // id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  todoIndex: PropTypes.number.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleTodoRemove: PropTypes.func.isRequired,
};
