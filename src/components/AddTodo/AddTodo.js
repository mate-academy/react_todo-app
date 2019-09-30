import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.Component {
  state = {
    title: '',
    id: 0,
  }

  handleInputTodo = ({ target }) => {
    this.setState({
      title: target.value.trimStart(),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, id } = this.state;

    if (title) {
      const todo = {
        title,
        id,
        status: false,
      };

      this.setState(prevState => ({
        title: '',
        id: prevState.id + 1,
      }));
      this.props.addTodo(todo);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleInputTodo}
          value={this.state.title}
        />
      </form>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func,
}.isRequired;

export default AddTodo;
