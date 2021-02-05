import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from './TodoItem';
import '../../styles/todo-list.css';
import '../../styles/index.css';
import '../../styles/filters.css';

export const TodoList = (props) => {
  const [statusCompleteAllTodo, setStatusCompleteAllTodo] = useState(true);

  const {
    items,
    deleteTodo,
    completeTodo,
    completeAllTodo,
  } = props;

  const handleClick = () => {
    if (statusCompleteAllTodo) {
      completeAllTodo(statusCompleteAllTodo);

      setStatusCompleteAllTodo(false);
    } else {
      completeAllTodo(statusCompleteAllTodo);

      setStatusCompleteAllTodo(true);
    }
  };

  // const isAnyTodos = todos.lengt > 0;

  return (
    <>
      {}
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={handleClick}
      />
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      <ul className="todo-list">
        {items.map(item => (
          <li
            className="todo-list-item"
            key={item.id}
          >
            <div className="view">
              <TodoItem
                completeTodo={completeTodo}
                itemId={item.id}
              />
              <label>{item.title}</label>
              <button
                type="button"
                className="destroy"
                value={item.id}
                onClick={event => deleteTodo(event.target.value)}
              />
            </div>
            <input type="text" className="edit" />
          </li>
        ))}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  completeTodo: PropTypes.func.isRequired,
  completeAllTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  items: [],
};
