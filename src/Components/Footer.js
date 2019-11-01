import React, { Component } from 'react';
import FooterButtons from './FooterButtons';

class Footer extends Component {
  render() {
    const { todolist, clearDone, filter, changeFilter } = this.props;
    const undoneListLength = todolist.filter(item => item.done === false).length;

    return (
      <footer className="footer" style={{ display: `${todolist.length > 0 ? 'block' : 'none'}` }}>
        <span className="todo-count">
          {`${undoneListLength} items left`}
        </span>

        <FooterButtons filter={filter} changeFilter={changeFilter}/>

        <button
          type="button"
          className="clear-completed"
          style={{ display: `${undoneListLength < todolist.length ? 'block' : 'none'}` }}
          onClick={clearDone}
        >
          Clear All Completed
        </button>
      </footer>
    );
  }
}

export default Footer;
