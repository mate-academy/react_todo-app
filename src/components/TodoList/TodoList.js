import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const { todos, handleFlag, filter, onDelete } = props;
  let preventedTodos = [];

  switch (filter) {
    case 'All':
      preventedTodos = todos;
      break;
    case 'Active':
      preventedTodos = todos.filter(todo => !todo.isCompleted);
      break;
    case 'Completed':
      preventedTodos = todos.filter(todo => todo.isCompleted);
      break;
    default:
      return false;
  }

  return (
    <ul className="todo-list">
      {
        preventedTodos.map(todo => (
          <li key={todo.id} className={todo.isCompleted ? 'completed' : ''}>
            <TodoItem
              todo={todo}
              handleFlag={handleFlag}
              onDelete={onDelete}
            />
          </li>
        ))
      }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  })).isRequired,
  handleFlag: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
