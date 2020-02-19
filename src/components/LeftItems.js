import React from 'react';

export const LeftItems = props => {
  const { count } = props;

  const renderContent = () => {
    return `${count} ${count === 1 ? 'item' : 'items'} left`;
  };

  return <span className="todo-count">{renderContent()}</span>;
};
