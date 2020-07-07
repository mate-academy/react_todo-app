import React from 'react';
import classnames from 'classnames';
import { TodoShape } from '../../Shapes';

export class Todo extends React.Component {
  state = {
    isEdit: false,
    editingTitle: this.props.title,
    tempTitle: null,
    editId: null,
  }

  focusInput = React.createRef();

  componentDidUpdate() {
    if (this.focusInput) {
      this.focusInput.current.focus();
    }
  }

  setEditingTitle = (event) => {
    const { value } = event.target;

    this.setState({
      editingTitle: value.replace(/\s/g, ' ').replace(/^\s/, ''),
    });
  }

  onDoubleClick = (currentId) => {
    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
      editId: currentId,
      tempTitle: prevState.editingTitle,
    }));
  }

  onBlurInput = () => {
    this.setState(prevState => ({
      editingTitle: prevState.tempTitle,
      isEdit: false,
    }));
  }

  onKeyPressed = (event) => {
    const { editId, editingTitle } = this.state;
    const { deleteTodo } = this.props;

    if (event.keyCode === 13) {
      if (!editingTitle || editingTitle.trim() === '') {
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

    const { isEdit, editingTitle } = this.state;

    const classes = classnames({
      editing: isEdit, completed,
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
            {editingTitle}
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
          value={editingTitle}
          ref={this.focusInput}
          onChange={event => this.setEditingTitle(event)}
          onKeyUp={event => this.onKeyPressed(event)}
          onBlur={this.onBlurInput}
        />
      </li>
    );
  }
}

Todo.propTypes = TodoShape.isRequired;
