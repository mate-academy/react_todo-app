import React from 'react';

export class NewTodo extends React.Component {
state = {
  title: '',
  arrLength: 1,
};

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleKeyDown = (e) => {
    const { addTodo } = this.props;
    if (e.key === 'Enter' && e.target.value !== '') {
      const obj = {
        title: e.target.value,
        id: this.state.arrLength,
        completed: false,
      };

      this.setState(prevState => ({
        title: '',
        arrLength: prevState.arrLength + 1,
      }));
      addTodo(obj);
    }
  };


  render() {
    return (
      <input
        name="newTodo"
        id="newTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={this.state.title}
        onChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
