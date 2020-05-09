import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from '../Button';
import { Checkbox, TextInput } from '../Form';

export class TodoItem extends Component {
  state = {
    inputTitle: '',
  }


  handleDoubleClick = (id, title) => {
    const { setEditingId } = this.props;

    this.setState({ inputTitle: title })
    document.addEventListener('keyup', this.handleKeyup);
    setEditingId(id)
  }

  handleKeyup =(e) => {
    const { setEditingId } = this.props;

    if (e.code === 'Escape') {
      this.setState({ inputTitle: '' })
      setEditingId();
      document.removeEventListener('keyup', this.handleKeyup);
    }
  }

  changeTitleTodo = ({ target }) => {
    this.setState({ inputTitle: target.value });
  }

  sendChanges = (e) => {
    e.preventDefault();

    const { id, setTodoValue } = this.props;
    const { inputTitle } = this.state;

    if (inputTitle.trim().length > 0) {
      setTodoValue(id, 'title', inputTitle.trim());
    }

    this.setState({ inputTitle: '' });
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
            <Checkbox 
              id={`${id}`}
              name={`${id}`}
              className="toggle"
              checked={completed}
              handleChange={toggleTodoStatus}
            />

            <label
              htmlFor={`edit-${id}`}
              onDoubleClick={() => this.handleDoubleClick(id, title)}
            >
              {title}
            </label>

            <Button
              id={`destroy-${id}`}
              name={`destroy-${id}`}
              className="destroy"
              handleClick={() => deleteTodo(id)}
            />
          </div>
          {editingTodoId === id && (
            <TextInput
              className="edit"
              id={`edit-${id}`}
              name={`edit-${id}`}
              value={inputTitle}
              autoFocus={true}
              handleChange={this.changeTitleTodo}
              handleBlur={this.sendChanges}
            />
          )}
        </form>
      </li>
    );
  }
}

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
