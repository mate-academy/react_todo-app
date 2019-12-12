import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleCheck, handleDestroy, selectedFilter }) => (
  <ul className="todo-list">
    {todos.filter((todoItem) => {
      if (selectedFilter === 'Active') {
        return !todoItem.completed;
      }

      if (selectedFilter === 'Completed') {
        return todoItem.completed;
      }

      return true;
    }).map(todoItem => (
      <TodoItem
        todo={todoItem}
        key={todoItem.id}
        handleCheck={handleCheck}
        handleDestroy={handleDestroy}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes
    .arrayOf(PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  handleCheck: PropTypes.func.isRequired,
  handleDestroy: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default TodoList;
