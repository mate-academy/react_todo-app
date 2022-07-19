import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import * as request from '../request/api';

import { TodoContext } from './TodoContext';

export const TodoItem = ({ item }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const checkedTodo = todos.find(todo => todo.id === item.id);

  const handleCheckbox = (status) => {
    setTodos([
      ...todos,
      checkedTodo.completed = status,
    ]);

    request.updateTodo('completed', status, item.id);
  };

  const changeTitle = () => {
    setTodos([
      ...todos,
      checkedTodo.title = newTitle,
    ]);

    request.updateTodo('title', newTitle, item.id);

    setEdit(false);
  };

  const handleDestroy = () => {
    setTodos(todos.filter(todo => todo.id !== item.id));

    request.deleteTodo(item.id);
  };

  const handleOnBlur = () => {
    changeTitle(item.id);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setNewTitle(item.title);
      setEdit(false);
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      if (newTitle.trim() === '') {
        handleDestroy();
      } else {
        changeTitle();
      }
    }
  };

  return (
    <li
      className={classNames(
        { completed: item.completed,
          editing: edit },
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          id={classNames(
            {
              'toggle-completed': item.completed,
              'toggle-view': !item.completed,
              'toggle-editing': edit,
            },
          )}
          onClick={() => handleCheckbox(!item.completed)}
        />
        <label onDoubleClick={() => setEdit(true)}>
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={handleDestroy}
          data-cy="deleteTodo"
        />
      </div>
      <input
        type="text"
        className="edit"
        id={edit ? 'editTodo' : null}
        value={newTitle}
        onChange={(event) => {
          setNewTitle(event.target.value);
        }}
        onBlur={handleOnBlur}
        onKeyDown={e => handleKeyDown(e)}
      />
    </li>
  );
};
