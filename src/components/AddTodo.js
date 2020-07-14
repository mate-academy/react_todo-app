import React from 'react';
import PropTypes from 'prop-types';

import { v4 as createId } from 'uuid';

export class AddTodo extends React.Component {
  state = {
    value: '',
  };

  onChange = (event) => {
    const { value } = event.target;

    this.setState({ value: value.trimStart() });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { addTodo } = this.props;
    const { value } = this.state;
    const todo = {
      id: createId(),
      isCompleted: false,
      value: value.trim(),
    };

    if ((!value.trim())) {
      return;
    }

    addTodo(todo);
    this.setState({
      value: '',
    });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { value } = this.state;

    return (
      <form className="form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
