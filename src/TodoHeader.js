import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

class TodoHeader extends React.Component {
  state = {
    inputValue: '',
  };

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  validateInput = (e) => {
    e.preventDefault();

    if (this.state.inputValue.trim().length > 0) {
      const todo = {
        id: +new Date(),
        title: this.state.inputValue,
        completed: false,
      };

      this.props.addTodo(todo);

      this.setState({
        inputValue: '',
      });
    }
  };

  render() {
    const { todosLength, isAllChecked, toggleAllTodos } = this.props;

    return (
      <form
        onSubmit={this.validateInput}
        className={cn('header')}
      >
        <input
          autoFocus
          onBlur={this.validateInput}
          onChange={this.handleInputChange}
          value={this.state.inputValue}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
        />

        {todosLength > 0 && (
          <>
            <input
              checked={isAllChecked}
              onChange={toggleAllTodos}
              type="checkbox"
              id="toggle-all"
              className={cn('toggle-all')}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}
      </form>
    );
  }
}

TodoHeader.propTypes = {
  addTodo: PropTypes.func.isRequired,
  isAllChecked: PropTypes.bool.isRequired,
  toggleAllTodos: PropTypes.func.isRequired,
  todosLength: PropTypes.number.isRequired,
};

export default TodoHeader;
