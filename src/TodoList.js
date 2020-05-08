import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ items, doneTask }) => (
  <>
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {items.map(item => (
        <TodoItem
          item={item}
          doneTask={doneTask}
          key={item.id}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  doneTask: PropTypes.func.isRequired,
  items: PropTypes.arrayOf.isRequired,
};

export default TodoList;
