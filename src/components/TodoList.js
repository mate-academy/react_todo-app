import classNames from 'classnames';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setDeleteTodo, renameTodo } from '../store/todos';

export const TodoList = ({
  todos,
  onTodoToggle,
}) => {
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const dispatch = useDispatch();

  const onTodoDelete = (todoId) => {
    const action = setDeleteTodo(todoId);

    dispatch(action);
  };

  const onTodoRename = (todoId, title) => {
    const action = renameTodo(todoId, title);

    dispatch(action);
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={classNames({
            completed: todo.completed,
            editing: todo.id === selectedTodoId,
          })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => {
                onTodoToggle(todo.id);
              }}
            />

            <label
              onDoubleClick={() => {
                setSelectedTodoId(todo.id);
              }}
            >
              {todo.title}
            </label>

            <button
              type="button"
              className="destroy"
              onClick={() => {
                onTodoDelete(todo.id);
              }}
            />
          </div>

          {todo.id === selectedTodoId && (
            <input
              defaultValue={todo.title}
              type="text"
              className="edit"
              onBlur={({ target }) => {
                onTodoRename(todo.id, target.value);
                setSelectedTodoId(0);
              }}
              onKeyDown={({ key, target }) => {
                if (key === 'Enter') {
                  onTodoRename(todo.id, target.value);
                  setSelectedTodoId(0);
                }

                if (key === 'Escape') {
                  setSelectedTodoId(0);
                }
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTodoToggle: PropTypes.func.isRequired,
};
