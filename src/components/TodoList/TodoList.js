import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
// import PropTypes from 'prop-types';

const TodoList = ({
  todos,
  onDeleted,
  onToggleDone,
}) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <TodoListItem
        id={id}
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  );
};

// TodoList.propTypes = {};

export default TodoList;
