import React from 'react';
import PropTypes from 'prop-types';

const ItemsLeft = ({ todos, itemsMany }) => {
  let counter = 0;
  const todosLeft = todos.map((todo) => {
    if (!todo.status) {
      counter += 1;
    }

    return counter;
  });

  const counterOfItems = todosLeft[todos.length - 1];
  let localItemsMany = itemsMany;

  if (counterOfItems === 1) {
    localItemsMany = false;
  }

  return (
    <span className="todo-count">
      {counterOfItems}
      &nbsp;
      {!localItemsMany
      && (<span>item left</span>)}
      {localItemsMany
      && (<span>items left</span>)}
    </span>
  );
};

ItemsLeft.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsMany: PropTypes.bool.isRequired,
};

export default ItemsLeft;
