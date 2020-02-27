import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
  todos,
  deleteTodo,
  updateCompleted,
  handleToggleAll,
  checked,
}) => (
  <>
    {
      todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={checked}
            onChange={() => handleToggleAll(checked)}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )
    }
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
      title: PropTypes.string,
      id: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ),
  checked: PropTypes.bool.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateCompleted: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
};

export default TodoList;
