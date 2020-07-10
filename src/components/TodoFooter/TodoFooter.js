import React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

export const TodoFooter = (props) => {
  const {
    remainedTasks,
    isSubmitted,
    handleShowActive,
    handleShowCompleted,
    handleShowAll,
    handleClearCompleted,
    value,
  } = props;
  const footerDisplaying = isSubmitted
    ? { display: 'block' } : { display: 'none' };

  const buttonsList = [
    {
      link: '#/',
      content: 'All',
      onClick: handleShowAll,
    },
    {
      link: '#/active',
      content: 'Active',
      onClick: handleShowActive,
    },
    {
      link: '#/completed',
      content: 'Completed',
      onClick: handleShowCompleted,
    },
  ];

  return (
    <footer className="footer" style={footerDisplaying}>
      <span className="todo-count">
        {`${remainedTasks} items left`}
      </span>

      <ul className="filters">
        {buttonsList.map((button, index) => (
          <li key={uuid()}>
            <a
              onClick={() => button.onClick(index)}
              href={button.link}
              className={value === index ? 'selected' : ''}
            >
              {button.content}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={handleClearCompleted}
        type="button"
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};

TodoFooter.propTypes = {
  remainedTasks: PropTypes.number.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  handleShowActive: PropTypes.func.isRequired,
  handleShowCompleted: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
