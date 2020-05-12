import React, { Component } from 'react';
import cn from 'classnames';
import { todoItemType } from '../../typedefs/todoItemType';
import './ToDoItem.scss';

/* eslint-disable jsx-a11y/no-autofocus */
export class ToDoItem extends Component {
  state = { editValue: '' }

  setEditValue = ({ target: { value } }) => {
    this.setState({ editValue: value });
  }

  render = () => {
    const {
      id,
      title,
      completed,
      isEditable,
      onToggle,
      onDelete,
      onEdit,
      handleKeyPress,
      setEditedValue,
    } = this.props;
    const { editValue } = this.state;

    return (
      <li className={cn('todo-item', {
        completed,
        editing: isEditable,
      })}
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            onChange={onToggle}
            checked={completed}
          />

          <label
            className={cn('todo-label', { checked: completed })}
            htmlFor={`todo-${id}`}
            onDoubleClick={onEdit}
          >
            {title}
          </label>

          <button
            type="button"
            className="destroy"
            onClick={onDelete}
          />
        </div>

        {isEditable && (
          <input
            type="text"
            className="edit"
            defaultValue={title}
            autoFocus
            onChange={this.setEditValue}
            onKeyDown={event => handleKeyPress(event, id, editValue)}
            onBlur={event => setEditedValue(event, id, editValue)}
          />
        )}
      </li>
    );
  }
}

ToDoItem.propTypes = todoItemType.isRequired;
