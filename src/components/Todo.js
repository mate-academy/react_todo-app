import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Todo extends React.Component {
  state = {
    editMode: false,
    tempTitle: '',
  }

  startEditMode = () => (
    this.setState({
      editMode: true,
      tempTitle: this.props.todo.title,
    }))

  handleChangingTitle = ({ target }) => {
    this.setState({
      tempTitle: target.value,
    });
  }

  handleEditingBlur = ({ target }) => {
    const { todo, editCurrentTitle } = this.props;
    const tempTitle = target.value;

    editCurrentTitle(todo.id, tempTitle);
    this.setState({ editMode: false });
  }

  editOnKeyDown = ({ target, key }) => {
    const { todo, editCurrentTitle } = this.props;

    const tempTitle = target.value;

    if (key === 'Enter' && tempTitle.trim().length !== 0) {
      editCurrentTitle(todo.id, tempTitle);
      this.setState({ editMode: false });
    }

    if (key === 'Escape') {
      this.setState({ editMode: false });
    }
  }

  render() {
    const { todo, deleteTodo, changeStatus } = this.props;
    const { editMode, tempTitle } = this.state;

    return (
      <li className={classNames({
        editing: editMode,
        completed: todo.completed,
      })}
      >
        <div className="view">
          <input
            id={todo.id}
            type="checkbox"
            className="toggle"
            onChange={() => changeStatus(todo.id)}
            checked={todo.completed}
          />
          <label onDoubleClick={this.startEditMode}>{todo.title}</label>
          <button
            type="button"
            id={todo.id}
            className="destroy"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
        {editMode && (
          <input
            type="text"
            id={todo.id}
            className="edit"
            value={tempTitle}
            onBlur={this.handleEditingBlur}
            onChange={this.handleChangingTitle}
            onKeyDown={this.editOnKeyDown}
            autoFocus
          />
        )}
      </li>
    );
  }
}

Todo.propTypes = {
  editCurrentTitle: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
    edited: PropTypes.bool,
  }).isRequired,
};
