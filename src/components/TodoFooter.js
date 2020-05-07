import React from 'react';
import TodoFilters from './TodoFilters';

const TodoFooter = () => (
  <footer className="footer">
    <span className="todo-count">
      3 items left
    </span>

    <TodoFilters />

    <button type="button" className="clear-completed">
      Clear completed
    </button>
  </footer>
);

export default TodoFooter;
