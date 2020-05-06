import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '../Button';

export class TodoItem extends Component {
  state = {
    inputTitle: this.props.title,
  }

  handleChangeTitleTodo = ({ target }) => {
    this.setState({ inputTitle: target.value });
  }

  sendChanges = (e) => {
    e.preventDefault();

    const { id, setTodoValue } = this.props;
    const { inputTitle } = this.state;

    if (/[A-Za-z]/g.test(inputTitle)) {
      setTodoValue(id, 'title', inputTitle.trim());
    }
  }

  render() {
    const {
      title,
      completed,
      id,
      toggleTodoStatus,
      editingTodoId,
      deleteTodo,
      setEditingId,
    } = this.props;

    const { inputTitle } = this.state;

    return (
      <li className={cn({
        completed: completed && editingTodoId !== id,
        editing: editingTodoId === id,
      })}
      >
        <form onSubmit={this.sendChanges}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={id}
              checked={completed}
              onChange={() => toggleTodoStatus(id)}
            />

            <label
              htmlFor={`edit-${id}`}
              onDoubleClick={() => setEditingId(id)}
            >
              {title}
            </label>

            <Button
              id={`destroy-${id}`}
              className="destroy"
              handlerClick={() => deleteTodo(id)}
            />
          </div>

          <input
            type="text"
            className="edit"
            id={`edit-${id}`}
            value={inputTitle}
            onChange={this.handleChangeTitleTodo}
            onBlur={this.sendChanges}
          />
        </form>
      </li>
    );
  }
}

TodoItem.defaultProps = {};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  editingTodoId: PropTypes.number.isRequired,
  toggleTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  setEditingId: PropTypes.func.isRequired,
  setTodoValue: PropTypes.func.isRequired,
};
