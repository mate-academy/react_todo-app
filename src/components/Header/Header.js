import React from 'react';
import { HeaderShape } from '../Shape';

export class Header extends React.Component {
  state = {
    title: '',
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    this.props.addTodo({
      title,
      isCompleted: false,
    });
    this.setState({
      title: '',
    });
  }

  render() {
    return (
      <header className="header">
        <h1>TODOS</h1>
        <form
          onSubmit={this.onSubmit}
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = HeaderShape;
