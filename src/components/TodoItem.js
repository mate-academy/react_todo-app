import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
  deleteTodo, togleCompleteTodo, changeTodoTitle,
} from '../redux/todos';
import { todoItemPropTypes } from '../propTypes/propTypes';

class TodoItem extends React.Component {
  state = {
    isEditableItem: false,
    inputValue: '',
  };

  componentDidUpdate() {
    this.TitleField.focus();
  }

  handleDbClick = () => {
    this.setState(prevState => ({
      inputValue: this.props.todo.title,
      isEditableItem: !prevState.isEditableItem,
    }));
  };

  handleInput = (event) => {
    const { value } = event.target;

    this.setState({
      inputValue: value,
    });
  };

  handlePressEnter = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleBlur = () => {
    if (this.state.isEditableItem !== false) {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { todo: { id }, ...props } = this.props;
    const inputValue = this.state.inputValue.trim();

    if (inputValue) {
      props.changeTodoTitle(id, inputValue);

      this.setState({
        isEditableItem: false,
      });
    } else {
      props.deleteTodo(id);
    }
  };

  render() {
    const { todo: { completed, id, title }, ...props } = this.props;
    const { isEditableItem } = this.state;

    const classes = classNames({
      editing: isEditableItem,
      completed,
    });

    return (
      <li className={classes}>
        <div className="view">
          <input
            type="checkbox"
            onClick={() => { props.togleCompleteTodo(id); }}
            className="toggle"
            checked={completed}
          />
          <label
            onDoubleClick={this.handleDbClick}
          >
            {title}
          </label>
          <button
            onClick={() => props.deleteTodo(id)}
            type="button"
            className="destroy"
          />
        </div>
        <input
          className="edit"
          onChange={this.handleInput}
          value={this.state.inputValue}
          onKeyPress={this.handlePressEnter}
          onBlur={this.handleBlur}
          ref={(input) => { this.TitleField = input; }}
        />
      </li>
    );
  }
}

const mapActions = {
  deleteTodo,
  togleCompleteTodo,
  changeTodoTitle,
};

export default connect(null, mapActions)(TodoItem);

TodoItem.propTypes = todoItemPropTypes;
