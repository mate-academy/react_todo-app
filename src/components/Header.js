import React from 'react';
import { HeaderShape } from '../Shapes';

class Header extends React.Component {
  state = {
    title: '',
  };

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState(({ title }) => {
      if (!title.replace(/^\s+/, '')) {
        return { title };
      }

      const { addTodo } = this.props;

      addTodo({
        title,
        id: Date.now(),
        completed: false,
      });

      return { title: '' };
    });
  };

  render() {
    const { title } = this.state;

    return (
      <header className="header">
        <h1>Todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            type="text"
            value={title}
            placeholder="What needs to be done?"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = HeaderShape.isRequired;

export default Header;
