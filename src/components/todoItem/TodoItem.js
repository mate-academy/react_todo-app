import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.title,
      isInEditMode: false,
    }
  }

  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode,
    })
  }

  onValueChange = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  changeTodoTitle = () => {
    const { value } = this.state;
    const { id } = this.props;

    if (value.trim() === '') {
      return this.props.removeTodo(id);
    }

    this.props.editTodo(value, id)

    this.setState({
      isInEditMode: false,
    })
  }

  render() {
    const { todo, removeTodo, onCompleted } = this.props;

    return (
      <li className={todo.completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={todo.id}
            onChange={onCompleted}
            checked={todo.completed}
          />

          {!this.state.isInEditMode
            ? <label className="label"
                onDoubleClick={this.changeEditMode}
              >
                {todo.title}
              </label>
            : <form onSubmit={this.changeTodoTitle}>
                <input
                  type="text"
                  className="edit"
                  onChange={this.onValueChange}
                  value={this.state.value}
                />
              </form>
          }

          <button
            type="button"
            className="destroy"
            onClick={() => removeTodo(todo.id)}
          />
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  removeTodo: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
}

export default TodoItem;
