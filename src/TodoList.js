import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  toggleTodoCompleted,
  toggleTodoCompletedAll,
  allCompleted,
  removeTodo,
}) => (

  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={toggleTodoCompletedAll}
      checked={allCompleted}
    />
    <label
      htmlFor="toggle-all"
    >
      Mark all as complete
    </label>

    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          toggleTodoCompleted={toggleTodoCompleted}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  toggleTodoCompletedAll: PropTypes.func.isRequired,
  allCompleted: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};

export default TodoList;
