import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem/TodoItem';

export const TodoList = ({ todos, onDeleteTodo, changeCompleted }) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {todos && todos.map((todo, idx) => (
        <TodoItem
          key={idx.toString()}
          todo={todo}
          idx={idx.toString()}
          onDeleteTodo={onDeleteTodo}
          changeCompleteness={changeCompleted}
        />
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  onDeleteTodo: PropTypes.func.isRequired,
  changeCompleted: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
