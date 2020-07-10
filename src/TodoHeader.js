import React from 'react';
import PropTypes from 'prop-types';

class TodoHeader extends React.Component {
  state = {
    tittle: '',
  };

  handleInputChange = (event) => {
    this.setState({
      tittle: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState(({ tittle }) => {
      if (!tittle.replace(/^\s+/, '')) {
        return { tittle };
      }

      const { addTodo } = this.props;

      addTodo({
        id: +new Date(),
        title: tittle,
        completed: false,
      });

      return { tittle: '' };
    });
  };

  render() {
    const { tittle } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            type="text"
            value={tittle}
            placeholder="What needs to be done?"
            maxLength={30}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

TodoHeader.propTypes = { addTodo: PropTypes.func.isRequired };

export default TodoHeader;
