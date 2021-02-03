import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { TypeTodo } from '../../types';

export const TodoList = ({
  removeItem,
  todos,
  toggleCompletedStatus,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id}
        className={cn({
          completed: todo.isCompleted,
          editing: todo.isBeingEdited,
        })}
      >
        <div className="view">
          {todo.isCompleted
          ? (<input
              type="checkbox"
              className="toggle"
              onChange={() => toggleCompletedStatus(todo.id)}
              checked
            />)
          : (<input
              type="checkbox"
              className="toggle"
              onChange={() => toggleCompletedStatus(todo.id)}
            />)
          }
          <label>
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            onClick={() => removeItem(todo.id)}
          />
        </div>
        <input type="text" className="edit" />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  removeItem: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
  toggleCompletedStatus: PropTypes.func.isRequired,
};
