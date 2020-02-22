import React from 'react';
import PropTypes from 'prop-types';

export const ClearButton = React.memo((props) => {
  const { onClick, todos } = props;

  const handleButtonClick = () => onClick();

  const disabledValue = todos.some(todo => todo.completed)
    ? ''
    : 'disabled';

  return (
    <button
      type="button"
      className="clear-completed"
      onClick={handleButtonClick}
      disabled={disabledValue}
    >
      Clear completed
    </button>
  );
});

ClearButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  })),
};

ClearButton.defaultProps = {
  todos: [{
    completed: false,
  }],
};
