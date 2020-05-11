import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class TodoItem extends React.Component {
  state = {
    currentTitle: '',
    textEditing: false,
  }

  editingMode = () => (
    this.setState({
      currentTitle: this.props.todo.title,
      textEditing: true,
    }))

  editingBlurMode = ({ target }) => {
    const currentTitle = target.value;
    const { todo, editTitle } = this.props;

    if (currentTitle.trim().length === 0) {
      editTitle(todo.id, todo.title);
    } else {
      editTitle(todo.id, currentTitle);
    }

    this.setState({ textEditing: false });
  }

  changingMode = ({ target }) => {
    this.setState({
      currentTitle: target.value,
    });
  }

  editKeyDown = ({ target, key }) => {
    const currentTitle = target.value;
    const { todo, editTitle } = this.props;

    if (key === 'Escape') {
      this.setState({ textEditing: false });
    }

    if (key === 'Enter' && currentTitle.trim().length !== 0) {
      editTitle(todo.id, currentTitle);
      this.setState({ textEditing: false });
    }
  }

  render() {
    const { todo, removeTodo, changeComplete } = this.props;
    const { textEditing, currentTitle } = this.state;

    return (
      <li className={classNames({
        edited: textEditing,
        completed: todo.completed,
      })}
      >
        <div className="view">
          <input
            id={todo.id}
            type="checkbox"
            className="toggle"
            onChange={() => changeComplete(todo.id)}
            checked={todo.completed}
          />
          <label onDoubleClick={this.editingMode}>{todo.title}</label>
          <button
            type="button"
            id={todo.id}
            className="destroy"
            onClick={() => removeTodo(todo.id)}
          />
        </div>
        {textEditing && (
          <input
            type="text"
            id={todo.id}
            className="edit"
            onBlur={this.editingBlurMode}
            onChange={this.changingMode}
            onKeyDown={this.editKeyDown}
            value={currentTitle}
          />
        )}
      </li>
    );
  }
}

TodoItem.propTypes = {
  editTitle: PropTypes.func.isRequired,
  changeComplete: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string,
    edited: PropTypes.bool,
    completed: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
};
