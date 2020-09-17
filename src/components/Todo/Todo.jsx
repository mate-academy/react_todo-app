import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo, changeProperty, editTitle, todosTools }) => {
  const { id, title, completed } = todo;
  const { todos, updateTodos } = todosTools;

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter(item => item.id !== todoId);

    updateTodos(updatedTodos);
    localStorage.clear('todos');
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
          editTitle(id);
        }}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        defaultValue={title}
        onBlur={({ target }) => {
          changeProperty(id, target.value);
          editTitle(null);
        }}
        onKeyDown={({ key, target }) => {
          if (key === 'Enter') {
            changeProperty(id, target.value);
            editTitle(null);
          }

          if (key === 'Escape') {
            editTitle(null);
          }
        }}
      />
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any).isRequired,
  changeProperty: PropTypes.func.isRequired,
  editTitle: PropTypes.func.isRequired,
  todosTools: PropTypes.shape({
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateTodos: PropTypes.func.isRequired,
  }).isRequired,
};
