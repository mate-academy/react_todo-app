import React from 'react';
import { uuid } from 'uuidv4';
import { TodoFooterShape } from '../Shapes/TodoFooterShape';

export const TodoFooter = (props) => {
  const {
    remainedTasks,
    handleShowActive,
    handleShowCompleted,
    handleShowAll,
    handleClearCompleted,
    value,
    defaultList,
  } = props;
  const footerDisplaying = defaultList.length
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

TodoFooter.propTypes = TodoFooterShape.isRequired;
