import React from 'react';
import propTypes from './propTypes';

function TodoList(props) {
  const { todo, onCheck, onRemove } = props;

  return (
    (
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={() => onCheck(todo.id)}
          checked={todo.completed}
        />
        <span className={todo.completed ? 'active' : ''}>
          {todo.todo}
          <button
            type="button"
            className="destroy"
            onClick={() => {
              onRemove(todo.id);
            }}
          />
        </span>
      </div>
    )
  );
}

TodoList.propTypes = propTypes.state;

export default TodoList;
