/* eslint-disable jsx-a11y/no-autofocus */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class TodoItem extends Component {
  state = { editValue: '' }

  setEditValue = ({ target }) => {
    this.setState({
      editValue: target.value,
    });
  }

  render = () => {
    const {
      todo,
      onToggle,
      onDelete,
      onEdit,
      handleKeyPress,
      setEditedValue,
    } = this.props;
    const { editValue } = this.state;

    return (
      <li className={cn(
        todo.completed && 'completed',
        todo.isEditable && 'editing',
      )}
      >
        <div className={cn('view')}>
          <input
            type="checkbox"
            className={cn('toggle')}
            onChange={onToggle}
            checked={todo.completed}
          />

          <label
            className={cn(todo.completed && 'checked')}
            htmlFor={`todo-${todo.id}`}
            onDoubleClick={onEdit}
          >
            {todo.title}
          </label>

          <button
            type="button"
            className={cn('destroy')}
            onClick={onDelete}
          />
        </div>

        {todo.isEditable && (
          <input
            type="text"
            className="edit"
            defaultValue={todo.title}
            autoFocus
            onChange={this.setEditValue}
            onKeyDown={
              event => handleKeyPress(event, todo.id, editValue)
            }
            onBlur={
              event => setEditedValue(event, todo.id, editValue)
            }
          />
        )}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  setEditedValue: PropTypes.func.isRequired,
};

export default TodoItem;
