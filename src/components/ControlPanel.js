import React from 'react';
import Buttons from './Buttons';

function ControlPanel({
  list, clearDone, activeFilter, props,
}) {
  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {list.filter(item => item.done === false).length}
        items left
      </span>

      <Buttons
        activeFilter={activeFilter}
        props={props}
      />

      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        onClick={clearDone}
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ControlPanel;
