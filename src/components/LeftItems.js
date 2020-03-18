import React from 'react';
import PropTypes from 'prop-types';

export const LeftItems = React.memo((props) => {
  const { count } = props;

  return (
    <span className="todo-count">
      {`${count} ${count === 1 ? 'item' : 'items'} left`}
    </span>
  );
});

LeftItems.propTypes = {
  count: PropTypes.number.isRequired,
};
