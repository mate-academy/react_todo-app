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
  setEditStatus,
  setTodoTitle,
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
            setEditStatus={setEditStatus}
            setTodoTitle={setTodoTitle}
          />
        </li>
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  visibleTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  statusOfTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired,
  setEditStatus: PropTypes.func.isRequired,
  setTodoTitle: PropTypes.func.isRequired,
};

export default TodoList;
