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

  addDoToList = (e) => {
    e.preventDefault();
    this.props.addDo(this.state.doName);
    this.setState({ doName: '' });
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.addDoToList}>
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

LayoutHeader.propTypes = { addDo: PropTypes.func.isRequired };

export default LayoutHeader;
