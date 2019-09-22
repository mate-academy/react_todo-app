import React from 'react';
import PropTypes from 'prop-types';

const classNames = require('classnames');

const ListOfTodos = ({
  listOfTodos,
  toggleTodoState,
  removeTodo,
  toggleToEditingMode,
  handleEditing,
  valueOfEditingInput,
  handleEditedSubmit,
}) => (
  <ul className="todo-list">
    {listOfTodos.map(todo => (
      <li className={
        classNames(
          { completed: todo.isChecked },
          { editing: todo.isEditing }
        )}
      >
        {!todo.isEditing
          ? (
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.isChecked}
                onChange={() => toggleTodoState(todo.id)}
              />
              <label
                onDoubleClick={() => toggleToEditingMode(todo.id, todo.title)}
              >
                {todo.title}
              </label>
              <button
                type="button"
                className="destroy"
                onClick={() => removeTodo(todo.id)}
              />
            </div>
          )
          : (
            <input
              type="text"
              value={valueOfEditingInput}
              className="edit"
              onChange={e => handleEditing(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && valueOfEditingInput) {
                  handleEditedSubmit(todo.id);
                }

                if (e.keyCode === 13 && !valueOfEditingInput) {
                  removeTodo(todo.id);
                }
              }}
              onBlur={() => {
                if (!valueOfEditingInput) {
                  removeTodo(todo.id);
                } else {
                  handleEditedSubmit(todo.id);
                }
              }}
              autoFocus
            />
          )}
      </li>
    ))}
  </ul>
);

ListOfTodos.propTypes = {
  listOfTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      isChecked: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  toggleTodoState: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleToEditingMode: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  valueOfEditingInput: PropTypes.string.isRequired,
  handleEditedSubmit: PropTypes.func.isRequired,
};

export default ListOfTodos;
