import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    state = {
      isEditing: false,
    };

    editingInput = React.createRef();

    componentDidUpdate() {
      if (this.state.isEditing) {
        this.editingInput.current.focus();
      }
    }

  handleTextInputChange = ({ target }) => {
    const { value } = target;
    const { handleEditTodo, index } = this.props;

    handleEditTodo(index, value);
  }

  toggleEditing = () => {
    if (this.props.todo.text === '') {
      this.editingInput.current.focus();

      return;
    }

    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
    }));
  }

  handleEndEditing = (e) => {
    if (e.keyCode === 13) {
      this.toggleEditing();
    }
  }

  render() {
    const { isEditing } = this.state;
    const { todo, handleToggleTodo, handleRemoveTodo } = this.props;
    const { text, completed } = todo;

    return (
      <li className={isEditing ? 'editing'
        : ((completed === false && 'completed')
        || undefined)}
      >
        <input
          type="checkbox"
          className="toggle"
          onChange={handleToggleTodo}
          checked={completed === false}
        />
        {isEditing
          ? (
            <input
              type="text"
              className="edit"
              onChange={this.handleTextInputChange}
              onKeyDown={this.handleEndEditing}
              onBlur={this.toggleEditing}
              ref={this.editingInput}
              value={text}
            />
          )
          : <label onDoubleClick={this.toggleEditing}>{text}</label>
        }
        <div className="view">
          <button
            className="destroy"
            onClick={handleRemoveTodo}
            type="button"
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool,
    text: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
