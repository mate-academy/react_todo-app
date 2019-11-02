import React from 'react';

function Buttons({ activeFilter, props }) {
  return (
    <ul className="filters">
      <li>
        <a
          href="#/"
          onClick={e => activeFilter(e)}
          className={props.activeTab === 'All' ? 'selected' : 'unselected'}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          onClick={e => activeFilter(e)}
          className={props.activeTab === 'Active' ? 'selected' : 'unselected'}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          onClick={e => activeFilter(e)}
          className={props.activeTab === 'Completed'
            ? 'selected' : 'unselected'}
        >
          Completed
        </a>
      </li>
    </ul>
  );
}

export default Buttons;
