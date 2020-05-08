import React from 'react';

import PropTypes from 'prop-types';

export class HeaderForm extends React.Component {
  state = {
    title: '',
  }

  handleInput = ({ target }) => {
    this.setState({ title: target.value.trimStart() });
  }

  handleOnSubmitForm = (event) => {
    event.preventDefault();
    this.props.addTodo(this.state.title);
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={this.handleOnSubmitForm}>
          <input
            value={this.state.title}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

HeaderForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
