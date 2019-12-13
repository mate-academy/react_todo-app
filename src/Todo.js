import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

class Todo extends React.Component {
  state = {
    editValue: this.props.todo.title,
  };

  handleInputChange = (e) => {
    this.setState({
      editValue: e.target.value,
    });
  };

  handleKeyPress = (e) => {
    const { todo, deleteTodo, editTodoTitle, selectToEdit } = this.props;

    if (e.key === 'Enter') {
      if (this.state.editValue.trim().length === 0) {
        deleteTodo(todo.id);
      }

      editTodoTitle(todo.id, this.state.editValue);
      selectToEdit(null);
    }

    if (e.key === 'Escape') {
      selectToEdit(null);
    }
  };

  editTodo = () => this.props.selectToEdit(this.props.todo.id);

  render() {
    const { todo, deleteTodo, checkTodo, canEdit } = this.props;

    return (
      <li className={cn(
        { completed: todo.completed },
        { editing: canEdit }
      )}
      >
        <div className={cn('view')}>
          <input
            checked={todo.completed}
            onChange={() => checkTodo(todo.id)}
            type="checkbox"
            className={cn('toggle')}
            id={todo.id}
          />
          <label
            htmlFor="todo-1"
            onDoubleClick={this.editTodo}
          >
            {todo.title}
          </label>
          <button
            onClick={() => deleteTodo(todo.id)}
            type="button"
            className={cn('destroy')}
          />
        </div>
        <input
          onChange={this.handleInputChange}
          onKeyUp={this.handleKeyPress}
          value={this.state.editValue}
          type="text"
          className="edit"
        />
      </li>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  canEdit: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
  editTodoTitle: PropTypes.func.isRequired,
  selectToEdit: PropTypes.func.isRequired,
};

export default Todo;
