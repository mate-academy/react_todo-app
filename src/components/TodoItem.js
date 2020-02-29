import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  state = {
    isEditing: false,
    editingText: '',
    isError: false,
    errorMessage: '',
  };

  editingInput = React.createRef();

  componentDidUpdate() {
    if (this.state.isEditing) {
      this.editingInput.current.focus();
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      editingText: target.value,
    });
  }

  handleInputKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.setState({
        isEditing: false,
        editingText: '',
        isError: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { editingText } = this.state;
    const { id, handleEditTodo } = this.props;

    if (editingText.trim() === '') {
      this.editingInput.current.focus();
      this.setState({
        isError: true,
        errorMessage: 'Please enter the todo',
      });

      return;
    }

    handleEditTodo(id, editingText);

    this.setState({
      isEditing: false,
      editingText: '',
      isError: false,
    });
  }

  toggleEditing = () => {
    const { text } = this.props.todo;

    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      editingText: text,
      isError: false,
    }));
  }

  render() {
    const {
      isEditing,
      isError,
      editingText,
      errorMessage,
    } = this.state;
    const { todo, handleToggleTodo, handleRemoveTodo } = this.props;
    const { text, completed } = todo;
    const className = isEditing
      ? 'editing'
      : (!(completed) && 'completed') || '';

    return (
      <li className={className}>
        <input
          type="checkbox"
          className="toggle"
          onChange={handleToggleTodo}
          checked={!completed}
        />
        {isEditing
          ? (
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="edit"
                onChange={this.handleInputChange}
                onBlur={this.toggleEditing}
                ref={this.editingInput}
                value={editingText}
                onKeyDown={this.handleInputKeyDown}
              />
              {isError && <div className="error">{errorMessage}</div>}
            </form>
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
  id: PropTypes.string.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
