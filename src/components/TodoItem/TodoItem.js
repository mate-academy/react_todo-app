/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  state = {
    editingInput: '',
  }

  handleClickCheckBox = ({ target }) => {
    const id = Number(target.id[target.id.length - 1]);
    const { changeCompleted } = this.props;

    changeCompleted(id);
  }

  handleClickButtonDestroy = ({ target }) => {
    const idInput = target.parentNode.children[0].id;
    const idTodo = Number(idInput[idInput.length - 1]);
    const { removeTodos } = this.props;

    removeTodos([idTodo]);
  }

  handleLableDoubleClick = ({ target }) => {
    const parentLi = target.closest('li');

    parentLi.classList.add('editing');
    this.setState({ editingInput: target.innerText });
  }

  handleBlurNewInput = (event) => {
    const { value } = event.target;
    const idMainInput = event.target.parentNode.children[0].children[0].id;
    const idTodo = Number(idMainInput[idMainInput.length - 1]);
    const parentLi = event.target.parentNode;

    this.props.editTask(idTodo, value);
    parentLi.classList.remove('editing');
    this.setState({ editingInput: '' });
  }

  handlePressKeyNewInput = (event) => {
    const { key } = event;
    const { value } = event.target;
    const idMainInput = event.target.parentNode.children[0].children[0].id;
    const idTodo = Number(idMainInput[idMainInput.length - 1]);
    const parentLi = event.target.parentNode;

    if (key === 'Enter') {
      this.props.editTask(idTodo, value);
      parentLi.classList.remove('editing');
      this.setState({ editingInput: '' });
    } else if (event.keyCode === 27) {
      parentLi.classList.remove('editing');
      this.setState({ editingInput: '' });
    }
  }

  handleOnChangeNewInput = (event) => {
    this.setState({
      editingInput: event.target.value,
    });
  }

  render() {
    const { id, title, completed } = this.props.item;

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`todo-${id}`}
            checked={completed}
            onChange={this.handleClickCheckBox}
          />
          <label
            htmlFor={`todo-${id}`}
            onClick={event => event.preventDefault()}
            onDoubleClick={this.handleLableDoubleClick}
          >
            {title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={this.handleClickButtonDestroy}
          />
        </div>
        {this.state.editingInput
          ? (
            <input
              type="text"
              className="edit"
              value={this.state.editingInput}
              onChange={this.handleOnChangeNewInput}
              onKeyDown={this.handlePressKeyNewInput}
              onBlur={this.handleBlurNewInput}
              autoFocus
            />
          )
          : null
        }
      </li>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  removeTodos: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default TodoItem;
