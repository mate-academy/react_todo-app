import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ items, onToggledTodo, onDeletedTodo }) => (
  <ul className="todo-list">
    {items.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        onToggled={() => onToggledTodo(item.id)}
        onDeleted={() => onDeletedTodo(item.id)}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggledTodo: PropTypes.func.isRequired,
  onDeletedTodo: PropTypes.func.isRequired,
};

export default TodoList;
