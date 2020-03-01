import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({
  todos,
  removeTodo,
  setCompleted,
  setAllCompleted,
  editTodo,
}) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={evt => setAllCompleted(evt.target.checked)}
    />
    {todos.length !== 0 && (
      <label htmlFor="toggle-all">Mark all as completed</label>
    )}
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          setCompleted={setCompleted}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,

  setCompleted: PropTypes.func.isRequired,
  setAllCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
