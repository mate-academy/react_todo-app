import React, { Component } from 'react';
import classNames from 'classnames';
import { TodoListItemProps } from '../../constants/proptypes';

class TodoListItem extends Component {
  constructor() {
    super();

    this.state = {
      isEditing: false,
    };
  }

  changeIsEditing = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }

  render() {
    const { isEditing } = this.state;

    const {
      id,
      label,
      onDeleted,
      onToggleDone,
      onSubmitEditedChange,
      completed,
    } = this.props;

    const classes = classNames({
      completed,
      editing: isEditing,
    });

    return (
      <li className={classes} key={id}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={completed}
            id={`todo-${id}`}
            onChange={onToggleDone}
          />
          {!isEditing && (
            <label
              htmlFor={`todo-${id}`}
              onDoubleClick={this.changeIsEditing}
            >
              {label}
            </label>
          )}
          <button
            type="button"
            className="destroy"
            onClick={onDeleted}
          />
        </div>
        {isEditing && (
          <form onSubmitEditedChange={onSubmitEditedChange}>
            <input
              className="edit"
              type="text"
              defaultValue={label}
            />
          </form>

        )}
      </li>
    );
  }
}

TodoListItem.propTypes = TodoListItemProps;

export default TodoListItem;
