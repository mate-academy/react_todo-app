import React from 'react';
import propTypes from 'prop-types';

function TodoApp(props) {
  const { todo, onCheck, onRemove } = props;

  return (
    (
      <li key={todo.id} className="">
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            onClick={() => onCheck(todo.id)}
            checked={todo.completed}
          />
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            {todo.todo}
            <button
              type="button"
              className="destroy"
              onClick={() => {
                onRemove(todo.id);
              }}
            />
          </label>
        </div>
      </li>
    )
  );
}

TodoApp.propTypes = {
  todo: propTypes.objectOf(propTypes.object).isRequired,
  onCheck: propTypes.func.isRequired,
  onRemove: propTypes.func.isRequired,
};

export default TodoApp;
