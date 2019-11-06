import React from 'react';
import ClearButton from './ClearButton';

function BottomControlPanel({ items, handleFilter, clearCompleted, selectedTab }) {
  return items
    && <footer className="footer" style={{display: 'block'}}>
        <span className="todo-count">
          {items.filter(item => !item.completed).length}
          <span> items left</span>
        </span>

      <ul className="filters">
        <li>
          {selectedTab === 'All'
            ? <a onClick={handleFilter} href="#/" className="selected">All</a>
            : <a onClick={handleFilter} href="#/">All</a>
          }
        </li>
        <li>
          {selectedTab === 'Active'
            ? <a onClick={handleFilter} href="#/" className="selected">Active</a>
            : <a onClick={handleFilter} href="#/active">Active</a>
          }
        </li>

        <li>
          {selectedTab === 'Completed'
            ? <a onClick={handleFilter} href="#/" className="selected">Completed</a>
            : <a onClick={handleFilter} href="#/completed">Completed</a>
          }
        </li>
      </ul>
      <ClearButton items={items} clearCompleted={clearCompleted}/>
    </ footer>
}

export default BottomControlPanel;
