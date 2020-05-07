import React from 'react';
import PropTypes from 'prop-types';

export class TodoApp extends React.Component {
  state ={
    title: '',
  }

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleReset = () => {
    this.setState({
      title: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addNewTodo, todos } = this.props;
    const { title } = this.state;

    if (!title.trim()) {
      this.setState({
        title: '',
      });

      return;
    }

    const newTodo = {
      title,
      id: todos.length + 1,
      completed: false,
    };

    addNewTodo(newTodo);

    this.handleReset();
  }

  // toggleSelectAll = () => {
  //   this.setState(() => ({
  //     todos: todos.map(todo => ({
  //       ...todo,

  //     }))
  //   }));
  // }

  render() {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

TodoApp.propTypes = {
  // id: PropTypes.number.isRequired,
  addNewTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
