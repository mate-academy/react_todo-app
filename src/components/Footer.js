import React from 'react';
import TodoFilter from './TodoFilter';
import { FooterShape } from '../Shapes';

export const Footer = ({ todos, currentFilter, setFilter, onClear }) => {
  const todosLeft = todos.filter(item => !item.completed).length;

  return (
    <>
      <footer className="footer">
        <span className="todo-count">
          {
            (todosLeft === 1)
              ? `${todosLeft} + ' todo to go'}`
              : `${todosLeft} + ' todos to go'}`
          }
        </span>

        <ul className="FILTERS">
          <TodoFilter
            onClick={() => setFilter('all')}
            filterType={currentFilter}
          >
            All
          </TodoFilter>
          <TodoFilter
            onClick={() => setFilter('active')}
            filterType={currentFilter}
          >
            Active
          </TodoFilter>
          <TodoFilter
            onClick={() => setFilter('completed')}
            filterType={currentFilter}
          >
            Completed
          </TodoFilter>
        </ul>

        {todos.some(item => item.completed) && (
          <button
            type="button"
            className="clear-completed"
            onClick={onClear}
          >
            Clear completed todos
          </button>
        )}
      </footer>
    </>
  );
};

Footer.propTypes = FooterShape.isRequired;
