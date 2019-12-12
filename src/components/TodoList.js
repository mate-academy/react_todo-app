import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ items, onTodoToggled, onTodoDeleted }) => (
  <ul className="todo-list">
    {items.map(item => (
      <TodoItem
        key={item.id}
        todo={item}
        onToggled={() => onTodoToggled(item.id)}
        onDeleted={() => onTodoDeleted(item.id)}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTodoToggled: PropTypes.func.isRequired,
  onTodoDeleted: PropTypes.func.isRequired,
};

export default TodoList;
