import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const {
    todos,
    onDeleteTodo,
    onUpdateCompleted,
    onToggleCompleted,
  } = props;

  return (
    <div>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onClick={onToggleCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      {todos.length > 0 && (
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              {...todo}
              onDeleteTodo={() => onDeleteTodo(todo.id)}
              onUpdateCompleted={() => onUpdateCompleted(todo.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onUpdateCompleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};
