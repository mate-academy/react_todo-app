import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.scss';

export const TodoList = ({ todos, onDelete }) => {
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <ul className="todo-list">
      {todos
        && todos.map(todo => (
          <TodoItem
            key={todo[1]}
            onDelete={onDelete}
            todo={todo}
          />
        ))}
    </ul>
  );
};

/* TodoList.propTypes = {
  todos: PropTypes.shape({
    PropTypes.shape({

    })
  }).isRequired,
}; */
