import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const TodoList = (props) => {
  const {
    todos,
    onDelete,
    onToggleDone,
    onMarkedAll,
  } = props;

  return (
    <section className="main" style={{ display: 'block' }}>
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      <label
        htmlFor="toggle-all"
        title="Mark all as complete"
        onClick={onMarkedAll}
      >
        Mark all as complete
      </label>

      <ul className="todo-list">
        {todos.map(todo => (
          <li className={todo.complete ? 'completed' : ''} key={todo.id}>
            <TodoItem
              todo={todo}
              onDelete={() => onDelete(todo.id)}
              onToggleDone={() => onToggleDone(todo.id)}

            />
          </li>
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onMarkedAll: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
