import React from 'react';
import PropTypes, { objectOf, shape } from 'prop-types';
import cn from 'classnames';

class ListTodos extends React.Component {
  state = {
    editingId: '',
    newValue: '',
    inputError: false,
  }

  editTodoValue = (id, value) => {
    this.setState(() => ({
      editingId: id,
      newValue: value,
      inputError: false,
    }));
  }

  changeTodoValue = (e) => {
    const letter = e.target.value.replace(/^ /, '');

    this.setState({ newValue: letter });
  }

  handleLostFocus = () => {
    const { changeTodoValue } = this.props;

    this.setState((state) => {
      const editingId = '';
      const newValue = '';
      let inputError = false;

      if (state.newValue.length < 3) {
        inputError = true;

        return {
          inputError,
        };
      }

      changeTodoValue(state.editingId, state.newValue);

      return {
        inputError,
        editingId,
        newValue,
      };
    });
  }

  handleTodoInput = (e) => {
    const { changeTodoValue } = this.props;
    const currentKey = e.key;

    this.setState((state) => {
      const inputError = false;
      const editingId = '';
      const newValue = '';

      if (currentKey === 'Enter' && state.newValue.length >= 3) {
        changeTodoValue(state.editingId, state.newValue);

        return {
          editingId,
          newValue,
          inputError,
        };
      }

      if (currentKey === 'Enter' && state.newValue.length < 3) {
        return {
          inputError: true,
        };
      }

      if (currentKey === 'Escape') {
        return {
          editingId: '',
          newValue: '',
          inputError,
        };
      }

      if (state.newValue.length >= 3) {
        return {
          inputError,
        };
      }
    });
  }

  render() {
    const { list, changeStatusComplete, destroyTodo } = this.props;
    const { editingId, newValue, inputError } = this.state;

    console.log(this.state.inputError);
    return (
      <ul className="todo-list">
        {list.map(todo => (
          <li
            key={todo.id}
            onDoubleClick={() => this.editTodoValue(todo.id, todo.value)}
            className={cn({
              editing: editingId === todo.id,
              completed: editingId !== todo.id && todo.completed,
              '': editingId !== todo.id && !todo.completed,
            })}
          >
            <div className="view" >
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
              value={newValue}
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
