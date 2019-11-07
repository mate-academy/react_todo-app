import React from 'react';

import PropTypes from 'prop-types';

const _ = require('lodash');
const classNames = require('classnames');

class TodoItem extends React.Component {
  state = {
    editedText: '',
    isEditing: false,
  };

  handleEditedText = ({ target: { value } }) => {
    this.setState({
      editedText: value.replace(/^\s+/, ''),
    });
  }

  activateEditing = (title) => {
    this.setState(({ isEditing }) => ({
      editedText: title,
      isEditing: !isEditing,
    }));
  }

  addNewText = (event) => {
    event.preventDefault();

    const { addEditText, todo: { id } } = this.props;
    const { editedText } = this.state;

    addEditText(editedText, id);
  }

  render() {
    const { editedText, isEditing } = this.state;

    const {
      todo,
      toggleCompleteStatus,
      toggleRemoveTodo,
    } = this.props;
    const editingTodo = classNames({ editing: isEditing });

    return (
      <li key={_.uniqueId('todo_')} className={editingTodo}>
        <div className="view">
          <input
            key={_.uniqueId('')}
            type="checkbox"
            className="toggle"
            onChange={() => toggleCompleteStatus(todo.id)}
            id={todo.id}
            checked={todo.completed}
          />
          <label
            htmlFor="todo-1"
            className={todo.completed ? 'toggle_line-through' : ''}
            onDoubleClick={() => this.activateEditing(todo.title)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => toggleRemoveTodo(todo.id)}
          />
        </div>
        <form onSubmit={this.addNewText} onBlur={this.addNewText}>
          <input
            onChange={this.handleEditedText}
            value={editedText}
            type="text"
            className="edit"
            autoFocus
          />
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  toggleCompleteStatus: PropTypes.func.isRequired,
  toggleRemoveTodo: PropTypes.func.isRequired,
  addEditText: PropTypes.func.isRequired,
};

export default TodoItem;
