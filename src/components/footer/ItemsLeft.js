import React from 'react';
import PropTypes from 'prop-types';

const ItemsLeft = ({ todosLeft }) => (
  <span className="todo-count">
    {todosLeft}
    &nbsp;
    {(todosLeft === 1)
    && (<span>item left</span>)}
    {(todosLeft !== 1)
    && (<span>items left</span>)}
  </span>
);

ItemsLeft.propTypes = {
  todosLeft: PropTypes.number.isRequired,
};

export default ItemsLeft;
