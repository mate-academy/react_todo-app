import React, { Component } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

export class AddNewTodo extends Component {
    state = {
      value: '',
    }

    handleInputTodoChange = ({ target }) => {
      const { value } = target;

      this.setState({
        value,
      });
    }

    handleEnterKeyDown = (event) => {
      const { value } = this.state;
      let newTodo = {};

      if (event.key === 'Enter') {
        this.setState((prevState) => {
          if (!prevState.value.trim()) {
            return '';
          }

          newTodo = {
            id: uuid(),
            title: value,
            completed: false,
          };

          this.props.onAdd(newTodo);

          return {
            id: '',
            value: '',
          };
        });
      }
    }

    render() {
      const {
        value,
      } = this.state;

      return (
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleInputTodoChange}
          onKeyDown={this.handleEnterKeyDown}
          value={value}
        />
      );
    }
}

AddNewTodo.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
