import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
  visibleTodos,
  handleRemoveTodo,
  statusOfTodo,
  handleToggleAll,
  handleEditTodo,
  handleEditTitle,
}) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={todos.length > 0 && todos.every(todo => todo.completed)}
      onChange={handleToggleAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {visibleTodos.map(todo => (
        <li
          className={cn({
            completed: todo.completed,
            editing: todo.editing,
          })}
          key={todo.id}
        >
          <TodoItem
            todo={todo}
            handleRemoveTodo={handleRemoveTodo}
            statusOfTodo={statusOfTodo}
            handleEditTodo={handleEditTodo}
            handleEditTitle={handleEditTitle}
          />
        </li>
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  visibleTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      todo: PropTypes.object.isRequired,
    }).isRequired,
  ).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  statusOfTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
  handleEditTitle: PropTypes.func.isRequired,
};

export default TodoList;
