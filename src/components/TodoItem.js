import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodoShape } from './TodoShape';

export class TodoItem extends React.Component {
  state = {
    todoTitle: '',
    isTitleValid: true,
    isEditing: false,
  }

  handleDoubleClick = (title) => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      todoTitle: title,
    }));
  }

  handleChange = (event) => {
    this.setState({
      todoTitle: event.target.value.replace(/[^\s\w]/g, ''),
      isTitleValid: true,
    });
  }

  handleKeyPress = (event, todoId) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const { saveEditedTodo } = this.props;

      if (this.state.todoTitle.replace(/\s+/g, '').length === 0) {
        this.setState({
          isTitleValid: false,
        });
      }

      if (this.state.isTitleValid) {
        saveEditedTodo({
          id: todoId,
          title: this.state.todoTitle,
          completed: false,
        });

        this.setState({
          todoTitle: '',
          isEditing: false,
        });
      }
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      this.setState({
        isEditing: false,
      });
    }
  }

  render() {
    const { todo, onCheck, onDelete } = this.props;

    return (
      <li
        className={
          classNames(
            { completed: todo.completed },
            { editing: this.state.isEditing },
          )
        }
      >
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            checked={todo.completed}
            onChange={() => onCheck(todo.id)}
          />
          <label
            onDoubleClick={() => this.handleDoubleClick(todo.title)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => onDelete(todo.id)}
          />
        </div>
        {
          this.state.isEditing
            ? (
              <input
                type="text"
                value={this.state.todoTitle}
                className={classNames({ edit: this.state.isEditing })}
                onChange={event => this.handleChange(event)}
                onKeyPress={event => this.handleKeyPress(event, todo.id)}
                onKeyDown={event => this.handleKeyDown(event)}
                ref={input => input && input.focus()}
              />
            )
            : (
              <span />
            )
        }

      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: TodoShape.isRequired,
  onCheck: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  saveEditedTodo: PropTypes.func.isRequired,
};
