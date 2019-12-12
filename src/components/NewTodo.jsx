import React from 'react';
import PropTypes from 'prop-types';

class AddNewTodo extends React.Component {
  state = {
    valuesMap: {
      title: '',
    },
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.valuesMap.title) {
      this.props.onSubmit({
        ...this.state.valuesMap,
        completed: false,
        id: new Date().getTime(),
      });
      this.setState({
        valuesMap: {
          title: '',
        },
      });
    }
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      valuesMap: {
        ...prevState.valuesMap,
        [name]: value,
      },
    }));
  };

  render() {
    const { valuesMap } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          onChange={this.handleFieldChange}
          value={valuesMap.title}
          name="title"
          autoComplete="off"
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

AddNewTodo.propTypes = {
  onSubmit: PropTypes.func,
};

AddNewTodo.defaultProps = {
  onSubmit: () => {},
};

export default AddNewTodo;
