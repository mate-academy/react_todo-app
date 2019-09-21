import React from 'react';
import PropTypes from 'prop-types';

class TodoForm extends React.Component {
  static propTypes = {
    todoID: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    title: '',
  };

  addTodo = (event) => {
    event.preventDefault();
    const { title } = this.state;
    const { onAdd, todoID } = this.props;

    onAdd({ id: todoID, title, completed: false });
    this.setState({ title: '' });
  };

  onInputChange = ({ target }) => {
    this.setState({ title: target.value });
  };

  render() {
    const { title } = this.state;

    return (
      <form action="" onSubmit={this.addTodo}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onInputChange}
          value={title}
        />
      </form>
    );
  }
}
export default TodoForm;
