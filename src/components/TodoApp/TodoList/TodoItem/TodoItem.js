import React from 'react';
import { PropTypes } from 'prop-types';
import cn from 'classnames';

export class TodoItem extends React.Component {
  state = {
    editing: false,
    todoEditingValue: this.props.todo.title,
  };

  handleKeyDown = (event) => {
    const {
      onSaveEdit,
      todo,
    } = this.props;

    if (event.key === 'Escape') {
      this.setState(prevState => ({
        ...prevState,
        todoEditingValue: todo.title,
        editing: false,
      }));
    } else if (event.key === 'Enter') {
      onSaveEdit(this.state.todoEditingValue, todo.id);
      this.setState(prevState => ({
        ...prevState,
        editing: false,
      }));
    }
  };

  onEdit = () => {
    this.setState(prevState => ({
      ...prevState,
      editing: true,
    }));
  };

  onInputTodoTitle = (event) => {
    const { target: { value } } = event;

    this.setState(prevState => ({
      ...prevState,
      todoEditingValue: value,
    }));
  };

  render() {
    const {
      todo,
      onStatus,
      onRemove,
    } = this.props;
    const {
      id,
      title,
      completed,
    } = todo;

    return (
      <li
        className={cn({ completed }, { editing: this.state.editing })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={id}
            checked={completed}
            onChange={() => onStatus(id)}
          />
          <label
            htmlFor={id}
            onDoubleClick={this.onEdit}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => onRemove(id)}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={this.state.todoEditingValue}
          onKeyDown={this.handleKeyDown}
          onChange={this.onInputTodoTitle}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onStatus: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
};
