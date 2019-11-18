import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      task123: '',
    };
  }

  selectItem = () => {
    this.setState((prev) => {
      const status = !prev.completed;
      const { setActive, todo } = this.props;

      setActive(todo.id, !status);

      return {
        completed: status,
      };
    });
  }

  destroyTodo = () => {
    const { deleteTodo, todo } = this.props;

    deleteTodo(todo.id);
  }

  modifyTodo = (id) => {
    this.props.editTodo(id);
    // console.log(id);
  }

  inputChanged = (event) => {
    this.setState({
      task123: event.target.value,
    });
  }

  doubleClicked = (event, id) => {
    event.preventDefault();
    // console.log('doubleClicked');
    this.modifyTodo(id);
  }

  render() {
    const { todo, editTodoId, showEditField } = this.props;

    return (
      <li
        onClick={this.selectItem}
        className={`${todo.isActive ? '' : 'completed'}${showEditField ? ' editing' : ''}`}
      >
        <div
          className="view"
          style={editTodoId === todo.id ? { display: 'none' } : { display: 'block' }}
        >
          <input
            type="checkbox"
            checked={!todo.isActive}
            className="toggle"
            id={`todo-${todo.id}`}
          />
          <label
            onClick={this.selectItem}
            htmlFor={`todo-${todo.id}`}
            onDoubleClick={event => this.doubleClicked(event, todo.id)}
          >
            {todo.task}
          </label>
          <button
            onClick={this.destroyTodo}
            type="button"
            className="destroy"
          />
        </div>
        <form onSubmit={this.props.submitEditItem}>
          <input
            className="edit"
            onChange={this.inputChanged}
            value={this.state.task123}
            placeholder="What do you want to change?"
            style={editTodoId === todo.id ? { display: 'block' } : { display: 'none' }}
          />
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  setActive: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number,
    isActive: PropTypes.bool,
    task: PropTypes.string,
    editTodo: PropTypes.string,
  }).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
