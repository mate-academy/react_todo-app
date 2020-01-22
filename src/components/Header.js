import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  onInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  createTodo = (event) => {
    const { title } = this.state;

    event.preventDefault();
    const newitem = {
      id: Date.now(),
      title,
      completed: false,
    };

    if (title) {
      this.props.addTodo(newitem);
      this.setState({
        title: '',
      });
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={async(event) => {
          await this.createTodo(event);
          this.props.togleAll();
        }}
        >
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onInputChange}
            value={this.state.title}
          />
        </form>
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired,
  togleAll: PropTypes.func.isRequired,
};

export default Header;
