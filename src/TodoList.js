import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  state = {
    editingTodoTitle: '',
    editingTodoId: 0,
  };

  startEditing = (id, title) => {
    this.setState(prevState => ({
      editingTodoTitle: title,
      editingTodoId: id,
    }));
  };

  handleTodoChange = ({ target: { value } }) => {
    this.setState(prevState => ({
      editingTodoTitle: value,
    }));
  };

  saveEditedTodo = (todo) => {
    const { removeTodo, editTodo } = this.props;
    const { editingTodoTitle } = this.state;

    if (editingTodoTitle.trim()) {
      editTodo(todo.id, editingTodoTitle.trim());

      this.setState(prevState => ({
        editingTodoTitle: '',
        editingTodoId: 0,
      }));
    } else {
      removeTodo(todo.id);
    }
  };

  handleKeyPress = (event, todo) => {
    if (event.key === 'Enter') {
      this.saveEditedTodo(todo);
    }

    if (event.key === 'Escape') {
      this.setState(prevState => ({
        editingTodoTitle: '',
        editingTodoId: 0,
      }));
    }
  };

  render() {
    const { todos, setTodoCompleted, removeTodo } = this.props;
    const { editingTodoTitle, editingTodoId } = this.state;

    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <li className={editingTodoId === todo.id ? 'editing' : ''}>
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                onClick={() => setTodoCompleted(todo.id)}
                checked={todo.completed}
              />
              <label
                onDoubleClick={() => this.startEditing(todo.id, todo.title)}
              >
                {todo.title}
              </label>
              <button
                onClick={() => removeTodo(todo.id)}
                type="button"
                className="destroy"
              />
            </div>
            {editingTodoId === todo.id && (
              <input
                type="text"
                className="edit"
                value={editingTodoTitle}
                onChange={this.handleTodoChange}
                onKeyUp={event => this.handleKeyPress(event, todo)}
                onBlur={() => this.saveEditedTodo(todo)}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setTodoCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoList;
