import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = (props) => {
  const {
    todos,
    deleteTodo,
    completedTodo,
    toggleCompletedAll,
  } = props;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={toggleCompletedAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {
          todos.map(todo => (
            <Todo
              {...todo}
              key={todo.id}
              completedTodo={completedTodo}
              deleteTodo={deleteTodo}
            />
          ))
        }
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  toggleCompletedAll: PropTypes.func.isRequired,
  completedTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
