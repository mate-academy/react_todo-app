import React, { Component } from 'react';
import './TodoItem.scss';
import { TodoItemTypes } from '../../constants/proptypes';

export default class TodoItem extends Component {
  state = {
    isEdit: false,
    editableTitle: this.props.title,
  };

  handleTodoDoubleClick = () => this.setState({ isEdit: true });

  handleTitleChange = ({ value }) => this.setState({ editableTitle: value });

  handleTitleBlur = () =>  this.setState({ isEdit: false });

  handleTitleSubmit = (e) => {
    e.preventDefault();
    this.props.handleTodoTitleEdit(this.props.id, this.state.editableTitle);
    this.setState({ isEdit: false });
  };

  render() {
    const {
      htmlFor,
      removeTodo,
      switchCompleted,
      id,
      title,
      completed,
    } = this.props;

    return (
      <li className={completed ? 'completed' : ''}>
        <div
          className="view"
        >
          <input
            type="checkbox"
            className="toggle"
            id={htmlFor}
            name={htmlFor}
            checked={completed}
            onChange={() => switchCompleted(id)}
          />
          {!this.state.isEdit && (
            <label
              htmlFor={htmlFor}
              onClick={e => e.preventDefault()}
              onDoubleClick={this.handleTodoDoubleClick}
            >
              {title}
            </label>
          )}
          {this.state.isEdit && (
            <form
              className="todo-item__form"
              onSubmit={e => this.handleTitleSubmit(e)}
            >
              <input
                className="todo-item__input"
                type="text"
                value={this.state.editableTitle}
                onChange={e => this.handleTitleChange(e.target)}
                onBlur={this.handleTitleBlur}
              />
            </form>
          )}
          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(id)}
          />
        </div>
      </li>
    );
  }
}
TodoItem.propTypes = TodoItemTypes;
