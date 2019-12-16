import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  state = {
    note: '',
  };

  handlerNoteChange = (event) => {
    this.setState({ note: event.target.value });
  };

  handlerFormSubmit = (event) => {
    event.preventDefault();
    const { addTodo } = this.props;
    const { note } = this.state;

    if (!note) {
      return;
    }

    addTodo(note);

    this.setState(() => (
      {
        note: '',
      }));
  };

  render() {
    const { note } = this.state;

    return (

      <form onSubmit={this.handlerFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handlerNoteChange}
          value={note}
        />
      </form>

    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Form;
