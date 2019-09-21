import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      title: this.props.todo.title,
    };
    this.textInput = React.createRef();
  }

  componentDidUpdate() {
    this.textInput.current.focus();
  }

  showEditField = () => {
    this.setState({ isEdit: true });
  };

  updateTodo = (event) => {
    event.preventDefault();
    this.setState({ isEdit: false, title: event.target.value });
    this.props.onEdit(this.props.todo.id, this.state.title);
  };

  editTodo = ({ target }) => {
    this.setState({ title: target.value });
  };

  render() {
    const { todo, onDelete, onComplete } = this.props;
    const { title, isEdit } = this.state;
    let todoClassList = '';

    todoClassList += todo.completed ? 'completed ' : '';
    todoClassList += isEdit ? 'editing ' : '';

    return (
      <li className={todoClassList}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            id={todo.id}
            onChange={() => onComplete(todo.id)}
          />
          <label
            htmlFor="todo-1"
            onDoubleClick={this.showEditField}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => onDelete(todo.id)}
          />
        </div>
        <input
          type="text"
          value={title}
          ref={this.textInput}
          className="edit"
          onChange={this.editTodo}
          onBlur={this.updateTodo}
          onKeyPress={e => (e.key === 'Enter' ? this.updateTodo(e) : 0)}
        />
      </li>
    );
  }
}
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
export default TodoItem;
