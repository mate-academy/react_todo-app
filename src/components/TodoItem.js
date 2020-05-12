import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class TodoItem extends Component {
  state = {
    isEdit: false,
  }

  handleStartEdit = () => {
    this.setState({
      isEdit: true,
    });
  }

  handleFinishEdit = (e, id) => {
    const { value } = e.target;

    if (e.key !== 'Enter' && e.type !== 'blur') {
      return;
    }

    this.setState({
      isEdit: false,
    });
    this.props.editTodo(value, id);
  }

  render() {
    const { id, completed, value, onItemClick, deleteItem } = this.props;
    const { isEdit } = this.state;
    const classItem = cn({ completed }, { editing: isEdit });

    return (
      <li className={classItem}>
        <div className="view">
          <input
            onChange={(e) => {
              onItemClick(id);
            }}
            type="checkbox"
            className="toggle"
            checked={!!completed}
            id={id}
          />
          <label
            htmlFor={id}
            onDoubleClick={this.handleStartEdit}
          >
            {' '}
            {value}
            {' '}

          </label>
          <button
            onClick={(e) => {
              deleteItem(id);
            }}
            type="button"
            className="destroy"
          />
        </div>
        {isEdit && (
          <input
            defaultValue={value}
            onChange={this.handleEditValue}
            onBlur={e => this.handleFinishEdit(e, id)}
            onKeyDown={e => this.handleFinishEdit(e, id)}
            type="text"
            className="edit"
            /* eslint-disable jsx-a11y/no-autofocus */
            autoFocus
          />
        )}
      </li>

    );
  }
}

TodoItem.propTypes = {
  editTodo: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
