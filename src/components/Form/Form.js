import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  state = {
    title: '',
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title } = this.state;

    this.props.addTodo(title);

    this.setState({
      title: '',
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default Form;
