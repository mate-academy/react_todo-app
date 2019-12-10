import React from 'react';

class AddNewTodo extends React.Component {
  state = {
    valuesMap: {
      title: '',
    },
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      this.props.onSubmit({
        ...prevState.valuesMap,
      });
    });

    this.setState({
      valuesMap: {
        title: '',
      },
    });
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

export default AddNewTodo;
