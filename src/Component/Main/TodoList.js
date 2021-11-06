import React, { useState } from 'react';
import classNames from 'classnames';
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
    showFotter,
    onAddNewTitle,
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

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className={
          classNames({
            'toggle-all': showFotter,
            hidden: !showFotter,
          })}
        onClick={handleClick}
      />
      {showFotter && (
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>
      )}

      <ul className="todo-list">
        {items.map(item => (
          <TodoItem
            key={item.id}
            completeTodo={completeTodo}
            item={item}
            deleteTodo={deleteTodo}
            onAddNewTitle={onAddNewTitle}
          />
        ))}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  onAddNewTitle: PropTypes.func.isRequired,
  showFotter: PropTypes.bool.isRequired,
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
