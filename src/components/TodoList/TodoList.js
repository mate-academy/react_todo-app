import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TodoItem } from '../TodoItem';

export const TodoList = (props) => {
  const {
    todos,
    deleteTodo,
    handleCompleted,
    enterEditingMode,
    handleChangingEditing,
  } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={cx({
            completed: todo.completed,
            editing: todo.edit,
          })}
        >

          <TodoItem
            todo={todo}
            deleteTodo={deleteTodo}
            handleCompleted={handleCompleted}
            enterEditingMode={enterEditingMode}
            handleChangingEditing={handleChangingEditing}
          />
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    completed: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  handleCompleted: PropTypes.func.isRequired,
  enterEditingMode: PropTypes.func.isRequired,
  handleChangingEditing: PropTypes.func.isRequired,
};
