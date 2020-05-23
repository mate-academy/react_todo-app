import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
  }

  handleChangeInput = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  changeId = () => (Math.random() + 1);

  handleSubmitTodo = (evt) => {
    evt.preventDefault();

    if (this.state.title.replace(/\s/g, '') !== '') {
      const todo = {
        id: `${this.changeId()}`,
        title: this.state.title,
        completed: false,
      };

      this.props.addTodo(todo);

      this.setState({
        title: '',
      });
    }
  }

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmitTodo}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          name={title}
          value={title}
          onChange={this.handleChangeInput}
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
