import React from 'react';
import classNames from 'classnames';

const ClearCompletedButton: React.FC<ClearCompletedProps> = ({
  completedTodosLength,
  handleClearCompletedClick,
}) => {
  const clearButtonClasses = classNames({
    'clear-completed': true,
    hidden: completedTodosLength === 0,
  });

  return (
    <button
      type="button"
      className={clearButtonClasses}
      onClick={handleClearCompletedClick}
    >
      Clear completed
    </button>
  );
};

export default ClearCompletedButton;
