import React from 'react';

const TodosFilter = ({
  onButtonAllChange, onButtonCompletedChange, onButtonActiveChange, todosList,
}) => (
  <footer className="footer" style={{ display: 'block' }}>
    <span className="todo-count">
      {todosList.length && todosList.filter(todo => !todo.completed).length }
      {' items left'}
    </span>

    <ul className="filters">
      <li>
        <a href="#/" className="selected" onClick={onButtonAllChange}>All</a>
      </li>

      <li>
        <a href="#/active" onClick={onButtonActiveChange}>Active</a>
      </li>

      <li>
        <a href="#/completed" onClick={onButtonCompletedChange}>Completed</a>
      </li>
    </ul>

    <button
      type="button"
      className="clear-completed"
      style={{ display: 'block' }}
    />
  </footer>
);

export default TodosFilter;
