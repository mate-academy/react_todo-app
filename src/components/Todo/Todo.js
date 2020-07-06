import React from 'react';
import classnames from 'classnames';
import { TodoShape } from '../../Shapes';

export class Todo extends React.Component {
  state = {
    isEdit: false,
    editTitle: this.props.title,
    tempTitle: null,
    editId: null,
  }

  editInput = null;

  componentDidUpdate() {
    this.focusEditInput();
  }

  focusEditInput = () => {
    if (this.editInput) {
      this.editInput.focus();
    }
  };

  setInputRef = (element) => {
    this.editInput = element;
  };

  setEditTitle = (event) => {
    const { value } = event.target;

    this.setState({
      editTitle: value.replace(/\s/g, ' ').replace(/^\s/, ''),
    });
  }

  onDoubleClick = (currentId) => {
    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
      editId: currentId,
      tempTitle: prevState.editTitle,
    }));
  }

  onBlurInput = () => {
    this.setState(prevState => ({
      editTitle: prevState.tempTitle,
      isEdit: false,
    }));
  }

  onKeyPressed = (event) => {
    const { editId, editTitle } = this.state;
    const { deleteTodo } = this.props;

    if (event.keyCode === 13) {
      event.preventDefault();

      if (!editTitle) {
        deleteTodo(editId);
      }

      this.onDoubleClick(editId);
    }

    if (event.keyCode === 27) {
      this.onBlurInput();
    }
  }

  render() {
    const {
      id,
      completed,
      checkedTodo,
      deleteTodo,
    } = this.props;

    const { isEdit, editTitle } = this.state;

    const classes = classnames({
      editing: isEdit === true, completed: completed === true,
    });

    return (
      <li
        className={classes}
      >
        <div className="view">
          <input
            type="checkbox"
            name="todo"
            className="toggle"
            checked={completed}
            id={id}
            onChange={event => checkedTodo(event.target.id)}
          />
          <label
            htmlFor={id}
            onDoubleClick={event => this.onDoubleClick(event.target.htmlFor)}
          >
            {editTitle}
          </label>
          <button
            type="button"
            className="destroy"
            id={id}
            onClick={event => deleteTodo(event.target.id)}
          />
        </div>
        <input
          type="text"
          name="editInput"
          className="edit"
          value={editTitle}
          ref={element => this.setInputRef(element)}
          onChange={event => this.setEditTitle(event)}
          onKeyUp={event => this.onKeyPressed(event)}
          onBlur={this.onBlurInput}
        />
      </li>
    );
  }
}

Todo.propTypes = TodoShape.isRequired;
