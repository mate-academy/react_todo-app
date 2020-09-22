import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({
  todo: { id, title, completed },
  changeProperty,
  editTitleTools: [todoEdited, changeStatusEdit],
  todosTools: { todos, updateTodos },
}) => {
  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter(item => item.id !== todoId);

    updateTodos(updatedTodos);
    localStorage.clear('todos');
  };

  const confirmChanges = (target) => {
    if (target.length === 0) {
      return deleteTodo(id);
    }

    changeProperty(id, target);

    return changeStatusEdit(null);
  };

  const keyPressed = (key, target) => {
    switch (key) {
      case 'Enter':
        confirmChanges(target);
        break;

      case 'Escape':
        changeStatusEdit(null);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div
        className="view"
      >
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => {
            changeProperty(id);
          }}
        />
        <label onDoubleClick={(event) => {
          event.preventDefault();
          changeStatusEdit(id);
        }}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </div>
      {
        todoEdited === id
        && (
          <input
            type="text"
            className="edit"
            autoFocus
            defaultValue={title}
            onBlur={({ target }) => {
              confirmChanges(target.defaultValue);
            }}
            onKeyDown={({ key, target }) => {
              keyPressed(key, target.value.trim());
            }}
          />
        )
      }
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any).isRequired,
  changeProperty: PropTypes.func.isRequired,
  editTitleTools: PropTypes.arrayOf(PropTypes.any).isRequired,
  todosTools: PropTypes.shape({
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateTodos: PropTypes.func.isRequired,
  }).isRequired,
};
