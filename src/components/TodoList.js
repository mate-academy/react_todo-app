import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ items, onStatusToggle, onDeleteTodo }) => (
  <ul className="todo-list">
    {items.map(({ id, title, completed }) => (
      <TodoItem
        key={id}
        title={title}
        itemId={id}
        completed={completed}
        statusToggle={onStatusToggle}
        deleteTodo={onDeleteTodo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onStatusToggle: PropTypes.func.isRequired,
};

export default TodoList;
