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

  handleEdit = (event, editingId, editingLabel) => {
    this.setState({
      editingValue: editingLabel,
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
    const { data, onCompleted, onDestroy } = this.props;

    return (
      <ul className="todo-list">
        {data.map(({ label, id, completed }) => (
          <li
            key={id}
            className={cx(``, {
              completed,
              editing: editing && editingField === id,
            })}
          >
            <form action="#" className="view">
              <input
                onClick={this.handleClick}
                checked={completed}
                onChange={onCompleted}
                type="checkbox"
                className="toggle"
                id={id}
              />
              <label
                className="custom-cursor"
                htmlFor={id}
              >
                <span className="tooltip input-tooltip">
                  <button
                    type="button"
                    onClick={event => this.handleEdit(event, id, label)}
                    className="button-tooltip"
                  >
                    Click for edit
                  </button>
                </span>
                {label}
              </label>
              <button
                name={id}
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
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setEditedValue: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
};
