import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TodoItem } from '../TodoItem';

export const TodoList = (props) => {
  const { todos, deleteTodo, handleCompleted } = props;

  // console.log(todos);

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          className={cx({ completed: todo.completed }, { editing: false })}
          key={todo.id}
        >
          <TodoItem
            todo={todo}
            deleteTodo={deleteTodo}
            handleCompleted={handleCompleted}
          />
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  deleteTodo: PropTypes.func,
  handleCompleted: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  deleteTodo: () => {},
  handleCompleted: () => {},
};
