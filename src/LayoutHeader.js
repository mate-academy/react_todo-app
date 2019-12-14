import React from 'react';
import PropTypes from 'prop-types';

class LayoutHeader extends React.Component {
  state = {
    doName: '',
  }

  changeName = (e) => {
    this.setState({
      doName: e.target.value,
    });
  }

  addToDoToList = (e) => {
    e.preventDefault();
    this.props.addToDo(this.state.doName);
    this.setState({ doName: '' });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.addToDoToList}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.changeName}
            value={this.state.doName}
          />
        </form>
      </header>
    );
  }
}

LayoutHeader.propTypes = { addToDo: PropTypes.func.isRequired };

export default LayoutHeader;
