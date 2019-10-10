import React from 'react';
import { NewTodoProps } from '../PropTypes/PropTypes';

const uuidv1 = require('uuid/v1');

class NewTodo extends React.Component {
  state = {
    titleOfTodo: '',
  }

  handleChangeInput = ({ target }) => {
    this.setState({
      titleOfTodo: target.value.replace(/^\s/, ''),
    });
  }

  handleInputTodo = (event) => {
    event.preventDefault();
    const { addNewTodo } = this.props;
    const { titleOfTodo } = this.state;

    addNewTodo({
      title: titleOfTodo,
      id: uuidv1(),
      completed: false,
    });

    this.setState({
      titleOfTodo: '',
    });
  }

  render() {
    const { titleOfTodo } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleInputTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleChangeInput}
            value={titleOfTodo}
            autoFocus
          />
        </form>
      </header>
    );
  }
}

NewTodo.propTypes = NewTodoProps;

export default NewTodo;
