import React from 'react';

class TodoForm extends React.Component {
  state = {
    value: '',
  }

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState(prevState => ({
      value,
    }));
  }

  handleSubmit = ({ target }) => {
    window.event.preventDefault();
    const { value } = this.state;
    const { onAdd } = this.props;

    onAdd(value);

    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.value}
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </form>
      </header>
    );
  }
}

export default TodoForm;
