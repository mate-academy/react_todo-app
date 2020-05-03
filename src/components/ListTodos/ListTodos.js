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

  saveOrCancel = (e) => {
    const { changeTodoValue } = this.props;
    const { editingId, editValue } = this.state;

    if (editValue.length >= 3) {
      this.setState(({ errorAddNewValue: false }));
    }

    if (e.key === 'Enter' && editValue.length >= 3) {
      changeTodoValue(editingId, editValue);
      this.setState(() => ({
        editingId: '',
        editValue: '',
      }));
    } else if (e.key === 'Enter' && editValue.length < 3) {
      this.setState(({ errorAddNewValue: true }));
    }

    if (e.key === 'Escape') {
      this.setState(({
        editingId: '',
        editValue: '',
        errorAddNewValue: false,
      }));
    }
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
