import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todos,
  editTitle,
  removeTodo,
  changeComplete,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        changeComplete={changeComplete}
        editTitle={editTitle}
        removeTodo={removeTodo}
        todo={todo}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  editTitle: PropTypes.func.isRequired,
  changeComplete: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    completed: PropTypes.bool,
    title: PropTypes.string,
  })).isRequired,
};
