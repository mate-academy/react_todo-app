import React from 'react';
import PropTypes, { objectOf, shape } from 'prop-types';
import cn from 'classnames';

class ListTodos extends React.Component {
  state = {
    editingId: '',
    editValue: '',
    inputError: false,
  }

  editTodoValue = (id, value) => {
    this.setState(() => ({
      editingId: id,
      editValue: value,
    }));
  }

  changeTodoValue = (e) => {
    const letter = e.target.value.replace(/^ /, '');

    this.setState({ editValue: letter });
  }

  handleLostFocus = () => {
    const { changeTodoValue } = this.props;

    this.setState((state) => {
      const editingId = '';
      const editValue = '';
      let inputError = false;

      if (state.editValue.length < 3) {
        inputError = true;

        return {
          inputError,
        };
      }

      changeTodoValue(state.editingId, state.editValue);

      return {
        inputError,
        editingId,
        editValue,
      };
    });
  }

  handleTodoInput = (e) => {
    const { changeTodoValue } = this.props;
    const currentKey = e.key;

    this.setState((state) => {
      const inputError = false;
      const editingId = '';
      const editValue = '';

      if (currentKey === 'Enter' && state.editValue.length >= 3) {
        changeTodoValue(state.editingId, state.editValue);

        return {
          editingId,
          editValue,
          inputError: false,
        };
      }

      if (currentKey === 'Enter' && state.editValue.length < 3) {
        return {
          inputError: true,
        };
      }

      if (currentKey === 'Escape') {
        return {
          editingId: '',
          editValue: '',
          inputError,
        };
      }

      if (state.editValue.length >= 3) {
        return {
          inputError,
        };
      }
    });
  }

  render() {
    const { list, changeStatusComplete, destroyTodo } = this.props;
    const { editingId, editValue, inputError } = this.state;

    return (
      <ul className="todo-list">
        {list.map(todo => (
          <li
            onDoubleClick={() => this.editTodoValue(todo.id, todo.value)}
            className={cn({
              editing: editingId === todo.id,
              completed: editingId !== todo.id && todo.completed,
              '': editingId !== todo.id && !todo.completed,
            })}
          >
            <div className="view" key={todo.id}>
              <input
                type="checkbox"
                className="toggle"
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => changeStatusComplete(todo.id)}
              />
              <label htmlFor={`todo-${todo.id}`}>{todo.value}</label>
              <button
                type="button"
                className="destroy"
                onClick={() => destroyTodo(todo.id)}
              />
            </div>
            <input
              type="text"
              className={inputError ? 'edit new-todo__error' : 'edit'}
              value={editValue}
              onChange={this.changeTodoValue}
              onKeyDown={this.handleTodoInput}
              onBlur={this.handleLostFocus}
            />
          </li>
        ))}
      </ul>
    );
  }
}

ListTodos.propTypes = {
  changeTodoValue: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(objectOf(shape({
    value: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }))).isRequired,
  changeStatusComplete: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};

export default ListTodos;
