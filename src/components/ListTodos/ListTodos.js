import React from 'react';
import PropTypes, { object } from 'prop-types';

class ListTodos extends React.Component {
  state = {
    editingId: '',
    editValue: '',
    errorAddNewValue: false,
  }

  editingValue = (id, value) => {
    this.setState(() => ({
      editingId: id, editValue: value,
    }));
  }

  changeTodoValue = (e) => {
    this.setState({ editValue: e.target.value });
  }

  lostFocus = () => {
    const { changeTodoValue } = this.props;

    this.setState((state) => {
      const editingId = '';
      const editValue = '';
      let errorAddNewValue = false;

      if (state.editValue.length < 3) {
        errorAddNewValue = true;

        return {
          errorAddNewValue,
        };
      }

      changeTodoValue(state.editingId, state.editValue);

      return {
        errorAddNewValue,
        editingId,
        editValue,
      };
    });
  }

  saveOrCancel = (e) => {
    const { changeTodoValue } = this.props;
    const currentKey = e.key;
    this.setState((state) => {
      const errorAddNewValue = false;
      const editingId = '';
      const editValue = '';

      if (currentKey === 'Enter' && state.editValue.length >= 3) {
        changeTodoValue(state.editingId, state.editValue);

        return {
          editingId, editValue, errorAddNewValue: false,
        };
      }

      if (currentKey === 'Enter' && state.editValue.length < 3) {
        return {
          errorAddNewValue: true,
        };
      }

      if (currentKey === 'Escape') {
        return {
          editingId: '',
          editValue: '',
          errorAddNewValue,
        };
      }

      if (state.editValue.length >= 3) {
        return {
          errorAddNewValue,
        };
      }
    });
  }

  render() {
    const { list, changeStatusComplete, destroyTodo } = this.props;
    const { editingId, editValue, errorAddNewValue } = this.state;

    return (
      <ul className="todo-list">
        {list.map((todo) => {
          let classValue;

          if (editingId === todo.id) {
            classValue = 'editing';
          } else if (todo.completed) {
            classValue = 'completed';
          } else {
            classValue = '';
          }

          return (
            <li
              onDoubleClick={() => this.editingValue(todo.id, todo.value)}
              className={classValue}
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
                className={errorAddNewValue ? 'edit new-todo__error' : 'edit'}
                value={editValue}
                onChange={this.changeTodoValue}
                onKeyDown={this.saveOrCancel}
                onBlur={this.lostFocus}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}

ListTodos.propTypes = {
  changeTodoValue: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(object).isRequired,
  changeStatusComplete: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};

export default ListTodos;
