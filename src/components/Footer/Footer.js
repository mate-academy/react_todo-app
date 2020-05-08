import React from 'react';
import { footerType } from '../../typedefs/footerType';
import { FilterList } from '../FilterList';
import './Footer.scss';

export const Footer = (
  { currentFilter, todos, onClearCompleted, onSetFilter },
) => {
  const completedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${completedTodos} items left`}
      </span>

      <FilterList
        onSetFilter={onSetFilter}
        selectedFilter={currentFilter}
      />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = footerType.isRequired;
