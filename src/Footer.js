import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ howManyTodosLeft, filters, currentFilter, setFilter, clearCompleted }) => ( 
  <footer className="footer">
      <span className="todo-count">
        <strong>
          {!howManyTodosLeft ? '' : howManyTodosLeft}
        </strong>
          {howManyTodosLeft === 0 ? "all done" : " items left" }
      </span>
      <ul className="filters">
        {
          filters.map( filter => (
            <li key={filter}>
              <a 
                href={`#/${filter}`}
                className={(currentFilter === filter ? 'selected' : '')}
                onClick={() => setFilter(filter)}
                >
                  {filter}
              </a>
            </li>
          ))
        }
      </ul>
      <button 
        className="clear-completed" 
        style={{ display: 'block' }}
        onClick={clearCompleted}
        >
        Clear completed
      </button>
    </footer>
)

Footer.propTypes = { 
  howManyTodosLeft: PropTypes.number.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

    
export default Footer;



