import React from 'react';

export const TodosFilter = ({ onFilter }) => (
  <ul className="filters">
    <li>
      <a
        href="#/"
        className="selected"
        onClick={() => {
          onFilter('all');
        }}
      >
        All
      </a>
    </li>

    <li>
      <a
        href="#/active"
        onClick={() => {
          onFilter('active');
        }}
      >
        Active
      </a>
    </li>

    <li>
      <a
        href="#/completed"
        onClick={() => {
          onFilter('completed');
        }}
      >
        Completed
      </a>
    </li>
  </ul>
);
