import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, toggleChecked, destroyItem }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        title={todo.title}
        id={todo.id}
        completed={todo.completed}
        toggleChecked={toggleChecked}
        destroyItem={destroyItem}
      />
    ))}
  </ul>
);

export default TodoList;

TodoList.propTypes = {
  toggleChecked: PropTypes.func.isRequired,
  destroyItem: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
