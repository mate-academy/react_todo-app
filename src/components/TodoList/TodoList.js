import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as cx from 'classnames';
import { EditField } from '../EditField';
import './TodoList.css';

export class TodoList extends PureComponent {
  state = {
    editingValue: '',
    editingField: null,
    editing: false,
  };

  handleEdit = (event, editingId, editingText) => {
    this.setState({
      editingValue: editingText,
      editingField: editingId,
      editing: true,
    });
  };

  handleEdited = (value) => {
    this.setState({
      editingValue: value,
      editing: false,
    });

    this.props.setEditedValue(this.state.editingValue, this.state.editingField);
  };

  render() {
    const { editing, editingField, editingValue } = this.state;
    const { todos, onCompleted, onDestroy } = this.props;

    return (
      <ul className="todo-list">
        {todos.map(({ text, id, completed }) => (
          <li
            key={id}
            className={cx({
              completed,
              editing: editing && editingField === id,
            })}
          >
            <form action="#" className="view">
              <input
                checked={completed}
                onChange={onCompleted}
                type="checkbox"
                className="toggle"
                id={id}
                data-index={id}
              />
              <label
                className="custom-cursor"
                htmlFor={id}
              >
                <span className="tooltip input-tooltip">
                  <button
                    type="button"
                    onClick={event => this.handleEdit(event, id, text)}
                    className="button-tooltip"
                  >
                    Click for edit
                  </button>
                </span>
                {text}
              </label>
              <button
                data-btn-index={id}
                type="button"
                className="destroy"
                onClick={onDestroy}
              />
            </form>
            {(editingField === id)
            && (
              <EditField
                value={editingValue}
                onClose={value => this.handleEdited(value)}
              />
            )
            }
          </li>
        ))
        }
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setEditedValue: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
};
