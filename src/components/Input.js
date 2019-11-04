import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { text } = this.state;

    onSubmit(text);
    this.setState({
      text: '',
    },
    localStorage.setItem('list', JSON.stringify(this.state.list)),
    localStorage.setItem('lastId', JSON.stringify(this.state.lastId)));
  }

  render() {
    const { text } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={text}
            onChange={event => this.setState({ text: event.target.value })}
          />
        </form>
      </header>
    );
  }
}

export default Input;
