import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

const TodoMain = ({
  todos,
  selectAll,
  todosFiltered,
  isCompleted,
  deleteTodo,
  fixTodo,
}) => (
  <section
    className="main"
    style={todos.length > 0
      ? { display: 'block' }
      : { display: 'none' }
    }
  >
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={todos.every(todo => todo.completed)}
      onChange={event => selectAll(event.target.checked)}
    />
    {/* eslint-disable-next-line */}
    <label htmlFor="toggle-all">Mark all as complete</label>

    <TodoList
      todos={todosFiltered}
      isCompleted={isCompleted}
      deleteTodo={deleteTodo}
      fixTodo={fixTodo}
    />
  </section>
);

TodoMain.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  selectAll: PropTypes.func.isRequired,
  todosFiltered: PropTypes.arrayOf(PropTypes.object).isRequired,
  isCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  fixTodo: PropTypes.func.isRequired,
};

export default TodoMain;
