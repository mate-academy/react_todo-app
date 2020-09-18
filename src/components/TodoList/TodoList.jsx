import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos, setTodos, changeCompleted, changeTitle }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        {...todo}
        todos={todos}
        setTodos={setTodos}
        changeTitle={changeTitle}
        changeCompleted={changeCompleted}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  changeCompleted: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  setTodos: PropTypes.func.isRequired,
};
