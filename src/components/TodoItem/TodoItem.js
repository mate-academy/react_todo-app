/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  handleClickCheckBox = ({ target }) => {
    const id = +target.id[target.id.length - 1];
    const { changeCompleted } = this.props;

    changeCompleted(id);
  }

  handleClickButtonDestroy = ({ target }) => {
    const idInput = target.parentNode.children[0].id;
    const idTodo = +idInput[idInput.length - 1];
    const { removeTodos } = this.props;

    removeTodos([idTodo]);
  }

  handleLabelClick = (event) => {
    event.preventDefault();
  }

  handleLableDoubleClick = ({ target }) => {
    const parentLi = target.closest('li');
    const newInput = document.createElement('input');

    newInput.value = target.innerText;
    parentLi.classList.add('editing');
    newInput.classList.add('edit');
    newInput.onkeydown = this.handlePressKeyNewInput;
    newInput.onblur = this.handleBlurNewInput;
    parentLi.append(newInput);
    newInput.focus();
  }

  handleBlurNewInput = (event) => {
    const { value } = event.target;
    const idMainInput = event.target.parentNode.children[0].children[0].id;
    const idTodo = +idMainInput[idMainInput.length - 1];
    const parentLi = event.target.parentNode;

    this.props.editTask(idTodo, value);
    parentLi.classList.remove('editing');
    parentLi.removeChild(event.target);
  }

  handlePressKeyNewInput = (event) => {
    const { key } = event;
    const { value } = event.target;
    const idMainInput = event.target.parentNode.children[0].children[0].id;
    const idTodo = +idMainInput[idMainInput.length - 1];
    const parentLi = event.target.parentNode;

    if (key === 'Enter') {
      this.props.editTask(idTodo, value);
      parentLi.classList.remove('editing');
    }
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
            onClick={this.handleLabelClick}
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
