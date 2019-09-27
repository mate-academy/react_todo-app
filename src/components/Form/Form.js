import React from 'react';
import shortid from 'shortid';

class Form extends React.Component {
  state = {
    todoTitle: '',
    id: '',
  }

  onEnterDown = (event) => {
    if (event.key === 'Enter') {
      if (this.state.todoTitle) {
        this.props.AddTodo({
          todoTitle: this.state.todoTitle,
          id: shortid.generate(),
          completed: false,
        });
        this.setState({ todoTitle: '' });
      }
    }
  }

  render() {
    const { todoTitle } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>

        <input
          value={todoTitle}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={event => this.setState({ todoTitle: event.target.value })}
          onKeyDown={this.onEnterDown}
        />
      </header>
    );
  }
}

export default Form;
