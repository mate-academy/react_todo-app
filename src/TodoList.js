import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ items, doneTask, deleteTodo, markAll }) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onClick={markAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {items.map(item => (
        <TodoItem
          item={item}
          doneTask={doneTask}
          deleteTodo={deleteTodo}
          key={item.id}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  markAll: PropTypes.func.isRequired,
  doneTask: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  items: PropTypes.arrayOf.isRequired,
};

export default TodoList;
