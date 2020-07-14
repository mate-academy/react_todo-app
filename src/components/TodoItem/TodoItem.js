import React from 'react';
import classnames from 'classnames';

import { TodoShapes } from '../../Shapes/Shapes';

export class TodoItem extends React.Component {
  state ={
    isEdit: false,
    editedTitle: this.props.title,
    editId: null,
    tempTitle: this.props.title,
  }

  inputFocus = React.createRef();

  componentDidUpdate() {
    if (this.inputFocus) {
      this.inputFocus.current.focus();
    }
  }

  onDoubleClick = (event) => {
    const taskId = event.target.id;

    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
      editId: taskId,
      tempTitle: prevState.editingTitle,
    }));
  }

  onBlurInput = () => {
    const { editId, editedTitle } = this.state;

    this.props.changeTodo(editId, editedTitle);
    this.setState(prevState => ({
      editingTitle: prevState.tempTitle,
      isEdit: false,
    }));
  }

  editingTitle = (event) => {
    const { value } = event.target;

    this.setState({
      editedTitle: value.replace(/^[\s]+|\s{2,}|\s+$/g, ''),
    });
  }

  onKeyPressed = (event) => {
    const { editId, editedTitle } = this.state;
    const { deleteTodo } = this.props;

    if (event.keyCode === 13) {
      if (!editedTitle || editedTitle.trim() === '') {
        deleteTodo(editId);
      }

      this.props.changeTodo(editId, editedTitle);
      this.onBlurInput();
    }

    if (event.keyCode === 27) {
      this.onBlurInput();
    }
  }

  render() {
    const {
      title,
      id,
      isCompleted,
      deleteTodo,
      completeTodo,
    } = this.props;

    const { editedTitle } = this.state;

    return (
      <>
        <li
          className={classnames({
            completed: isCompleted, editing: this.state.isEdit,
          })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={id}
              onChange={() => completeTodo(id)}
              checked={isCompleted}
            />
            <label
              id={id}
              onDoubleClick={this.onDoubleClick}
              htmlFor={`todo-${id}`}
            >
              {title}
            </label>
            <button
              onClick={() => deleteTodo(id)}
              type="button"
              className="destroy"
              id={id}
            />
          </div>
          <input
            value={editedTitle}
            onBlur={this.onBlurInput}
            onChange={this.editingTitle}
            onKeyUp={this.onKeyPressed}
            type="text"
            className="edit"
            id={id}
            ref={this.inputFocus}
          />
        </li>
      </>
    );
  }
}

TodoItem.propTypes = TodoShapes.isRequired;
