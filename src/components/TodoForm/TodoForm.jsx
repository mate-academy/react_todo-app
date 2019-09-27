import React from 'react';

class TodoForm extends React.Component {
  state = {
    value: '',
  }

  handleChange = (e) => {
    const val = e.target.value;

    this.setState(prevState => ({
      value: val,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const valState = this.state.value;
    const { onAdd } = this.props;

    onAdd(valState);

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
