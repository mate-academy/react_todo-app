import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  state = {
    isEditing: false,
    editingText: '',
    isError: null,
  };

  editingInput = React.createRef();

  componentDidUpdate() {
    if (this.state.isEditing) {
      this.editingInput.current.focus();
    }
  }

  handleTextInputChange = ({ target }) => {
    this.setState({
      editingText: target.value,
    });
  }

  handleInputKeyDown = ({ keyCode }) => {
    const { editingText } = this.state;
    const { index, handleEditTodo } = this.props;

    if (editingText.trim() === '') {
      this.editingInput.current.focus();
      this.setState({
        isError: 'Please enter the todo',
      });

      return;
    }

    if (keyCode === 13) {
      handleEditTodo(index, editingText);

      this.setState({
        isEditing: false,
        editingText: '',
        isError: null,
      });
    } else if (keyCode === 27) {
      this.setState({
        isEditing: false,
        editingText: '',
        isError: null,
      });
    }
  };

  toggleEditing = () => {
    const { text } = this.props.todo;

    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      editingText: text,
    }));
  }

  render() {
    const { isEditing, isError, editingText } = this.state;
    const { todo, handleToggleTodo, handleRemoveTodo } = this.props;
    const { text, completed } = todo;

    return (
      <li className={isEditing ? 'editing'
        : ((completed === false && 'completed') || undefined)
      }
      >
        <input
          type="checkbox"
          className="toggle"
          onChange={handleToggleTodo}
          checked={completed === false}
        />
        {isEditing
          ? (
            <>
              <input
                type="text"
                className="edit"
                onChange={this.handleTextInputChange}
                onBlur={this.toggleEditing}
                ref={this.editingInput}
                value={editingText}
                onKeyDown={this.handleInputKeyDown}
              />
              {isError && <div className="error">{isError}</div>}
            </>
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
