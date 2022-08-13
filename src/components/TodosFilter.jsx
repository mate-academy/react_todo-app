import React from 'react';

export const TodosFilter = ({
  all,
  active,
  complited,
  setAll,
  setActive,
  setComplited,
  setRemoveComplited,
}) => (
  <div>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={all ? 'selected' : ''}
          onClick={() => {
            setAll(true);
            setActive(false);
            setComplited(false);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={active ? 'selected' : ''}
          onClick={() => {
            setAll(false);
            setActive(true);
            setComplited(false);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={complited ? 'selected' : ''}
          onClick={() => {
            setAll(false);
            setActive(false);
            setComplited(true);
          }}
        >
          Completed
        </a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      onClick={() => {
        setRemoveComplited(true);
      }}
    >
      Clear completed
    </button>
  </div>
);
