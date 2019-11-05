import React from 'react';
import ClearButton from './ClearButton';

function BottomControlPanel({items, handleFilter, clearCompleted}) {
  return items
    && <footer className="footer" style={{display: 'block'}}>
        <span className="todo-count">
          {items.filter(item => !item.completed).length}
          <span> items left</span>
        </span>

      <ul className="filters">
        <li>
          <a onClick={handleFilter} href="#/" className="selected">All</a>
        </li>

        <li>
          <a onClick={handleFilter} href="#/active">Active</a>
        </li>

        <li>
          <a onClick={handleFilter} href="#/completed">Completed</a>
        </li>
      </ul>

      <ClearButton items={items} clearCompleted={clearCompleted} />
    </ footer>
}

export default BottomControlPanel;
