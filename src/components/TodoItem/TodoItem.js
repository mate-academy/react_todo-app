import React from 'react';

import { TodoItemTypes } from '../PropTypes/PropTypes';

class TodoItem extends React.Component {
  state = {
    isEditing: false,
    titleToEdit: this.props.title,
  };

  handleDoubClick = () => this.setState({ isEditing: true });

  handleTitleChange = ({ value }) => {
    this.setState({ titleToEdit: value });
  };

  handleTitleChangeEnd = () => this.setState({ isEditing: false });

  handleTitleSubmit = (e) => {
    e.preventDefault();
    const { handleTodoTitleEdit, id } = this.props;

    handleTodoTitleEdit(id, this.state.titleToEdit);
    this.setState({ isEditing: false });
  };

  render() {
    const {
      id,
      title,
      completed,
      destroyTodo,
      changeStatus,
    } = this.props;

    const { isEditing, titleToEdit } = this.state;

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            name={id}
            id={id}
            checked={completed}
            onChange={() => changeStatus(id)}
          />
          {isEditing
            ? (
              <form
                className="todo-item__form"
                onSubmit={e => this.handleTitleSubmit(e)}
              >
                <input
                  className="todo-item__input"
                  type="text"
                  value={titleToEdit}
                  onChange={e => this.handleTitleChange(e.target)}
                  onBlur={this.handleTitleChangeEnd}
                />
              </form>
            )
            : (
              <label
                htmlFor={id}
                onClick={e => e.preventDefault()}
                onDoubleClick={this.handleDoubClick}
              >
                {title}
              </label>
            )}
          <button
            type="button"
            className="destroy"
            onClick={() => destroyTodo(id)}
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = TodoItemTypes;

export default TodoItem;
