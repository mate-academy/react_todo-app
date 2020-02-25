import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.editingInput = React.createRef();
  }

  componentDidUpdate() {
    if (this.state.isEditing) {
      this.editingInput.current.focus();
    }
  }

  onTextInputChange = (e) => {
    const { value } = e.target;

    this.props.handleEditTodo(this.props.index, value);
  }

  toggleEditing = () => {
    if (this.props.data.text === '') {
      return this.editingInput.current.focus();
    }

    return this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  }

  handleEndEditing = (e) => {
    if (e.keyCode === 13) {
      this.toggleEditing();
    }
  }

  render() {
    const { isEditing } = this.state;
    const { data, handleToggleTodo, handleRemoveTodo } = this.props;
    const { text, completed } = data;

    return (
      <li className={isEditing ? 'editing' : (completed === 0 && 'completed')}>
        <input
          type="checkbox"
          className="toggle"
          onChange={handleToggleTodo}
          checked={completed === 0 && 'checked'}
        />
        {isEditing
          ? (
            <input
              type="text"
              className="edit"
              onChange={this.onTextInputChange}
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
  data: PropTypes.shape({
    completed: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleToggleTodo: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
