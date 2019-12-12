import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const Main = (
  {
    allToggleTodo,
    filteredTodos,
    toggleTodo,
    destroyTodo,
  }
) => (
  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={allToggleTodo}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          toggle={toggleTodo}
          destroyTodo={destroyTodo}
        />
      ))}
    </ul>
  </section>
);

Main.propTypes = {
  filteredTodos: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  allToggleTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  destroyTodo: PropTypes.func.isRequired,
};

export default Main;
