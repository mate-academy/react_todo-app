import React from 'react';
import TodoFilter from './TodoFilter';

const TodoFooter = () => (
  <footer className="footer">
    <span className="todo-count">
      3 items left
    </span>

    <TodoFilter />

    <button type="button" className="clear-completed">
      Clear completed
    </button>
  </footer>
);

export default TodoFooter;
