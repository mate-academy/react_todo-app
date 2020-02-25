import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = (props) => {
  const { todos, onCheckBox, onDestroy, onEdit } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          onEdit={onEdit}
          onDestroy={onDestroy}
          onCheckBox={onCheckBox}
          key={todo.id}
          {...todo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onCheckBox: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
