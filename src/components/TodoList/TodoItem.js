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

  onEdit = (id) => {
    const { setEditingId } = this.props;

    document.addEventListener('keyup', this.handleKeyup)

    setEditingId(id)
  }

  handleKeyup =(e) => {
    const { title, setEditingId } = this.props;

    if (e.code === 'Escape') {
      this.setState({inputTitle: title })
      setEditingId();

      document.removeEventListener('keyup', this.handleKeyup);
    }
  }

  sendChanges = (e) => {
    e.preventDefault();

    const { id, setTodoValue } = this.props;
    const { inputTitle } = this.state;

    if (inputTitle.trim().length > 0) {
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
              onDoubleClick={() => this.onEdit(id)}
            >
              {title}
            </label>

            <Button
              id={`destroy-${id}`}
              name={`destroy-${id}`}
              className="destroy"
              handlerClick={() => deleteTodo(id)}
            />
          </div>
          {editingTodoId === id && (
            <input
              type="text"
              className="edit"
              id={`edit-${id}`}
              value={inputTitle}
              autoFocus={true}
              onChange={this.handleChangeTitleTodo}
              onBlur={this.sendChanges}
            />
          )}
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
