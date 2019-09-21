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

  handleChange = () => {
    this.props.onComplete(this.props.todo.id);
  };

  deleteTodo = () => {
    this.props.onDelete(this.props.todo.id);
  };

  showEditField = () => {
    this.setState({ isEdit: true });
  };

  updateTodoOnBlur = ({ target }) => {
    this.setState({ isEdit: false, title: target.value });
    this.props.onEdit(this.props.todo.id, this.state.title);
  };

  updateTodoOnEnter = (event) => {
    if (event.key === 'Enter') {
      this.setState({ isEdit: false, title: event.target.value });
      this.props.onEdit(this.props.todo.id, this.state.title);
    }
  };

  editTodo = ({ target }) => {
    this.setState({ title: target.value });
  };

  render() {
    const { todo } = this.props;
    const { title } = this.state;
    let todoClassList = '';

    todoClassList += todo.completed ? 'completed ' : '';
    todoClassList += this.state.isEdit ? 'editing ' : '';

    return (
      <li className={todoClassList}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            checked={todo.completed}
            id={todo.id}
            onChange={this.handleChange}
          />
          <label
            htmlFor="todo-1"
            onDoubleClick={this.showEditField}
          >
            {title}
          </label>
          <button type="button" className="destroy" onClick={this.deleteTodo} />
        </div>
        <input
          type="text"
          value={title}
          ref={this.textInput}
          className="edit"
          onChange={this.editTodo}
          onKeyPress={this.updateTodoOnEnter}
          onBlur={this.updateTodoOnBlur}
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
