import React from 'react';
import PropTypes from 'prop-types';

class TodoInput extends React.Component {
  state = {
    createNewTodo: '',
  }

  enterNewTodo = (event) => {
    this.setState({ createNewTodo: event.target.value });
  };

  editTodos = (createNewTodo) => {
    if (!createNewTodo.length) {
      return;
    }

    this.props.addNewTodo(createNewTodo);
    this.setState({ createNewTodo: '' });
  }

  render() {
    const { createNewTodo } = this.state;

    return (
      <form onSubmit={() => this.editTodos(createNewTodo)}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.enterNewTodo}
          value={createNewTodo}
        />
      </form>
    );
  }
}

TodoInput.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};

export default TodoInput;
