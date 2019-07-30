import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({
  todoList, filterByButton, toggleChecked, deleteItem,
}) => {
  const filterBy = (item) => {
    if (filterByButton === 'Completed') {
      return item.completed;
    }

    if (filterByButton === 'Active') {
      return !item.completed;
    }

    return item;
  };

  return (
    <ul className="todo-list">
      {todoList
        .filter(todo => filterBy(todo))
        .map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleChecked={toggleChecked}
            deleteItem={deleteItem}
          />
        ))}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleChecked: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  filterByButton: PropTypes.string.isRequired,
};

export default TodoList;
