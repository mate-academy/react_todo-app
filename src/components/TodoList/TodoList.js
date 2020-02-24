import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
  todos,
  deleteTodo,
  updateCompleted,
  handleToggleAll,
}) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={handleToggleAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {
        todos.map(todo => (
          <li key={todo.id}>
            <TodoItem
              {...todo}
              deleteTodo={() => deleteTodo(todo.id)}
              updateCompleted={() => updateCompleted(todo.id)}
            />
          </li>
        ))
      }
    </ul>
  </>
);

TodoList.defaultProps = {
  todos: [],
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
  deleteTodo: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
};

export default TodoList;
