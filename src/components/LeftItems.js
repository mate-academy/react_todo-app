import React from 'react';
import PropTypes from 'prop-types';

export const LeftItems = (props) => {
  const { count } = props;

  const renderContent = () => (
    `${count} ${count === 1 ? 'item' : 'items'} left`
  );

  return <span className="todo-count">{renderContent()}</span>;
};

LeftItems.propTypes = {
  count: PropTypes.number.isRequired,
};
