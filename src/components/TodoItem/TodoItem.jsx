import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { TodosContext } from '../../TodosContext';
import { useFocus } from '../../hooks/useFocus';
import { useMountEffect } from '../../hooks/useMountEffect';

export const TodoItem = ({ id, title, completed }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [wasDoubleClicked, setWasDoubleClicked] = useState(false);
  const [editingTitle, setEditingTitle] = useState(title);
  const [inputRef, setInputFocus] = useFocus();

  const handleCompleteTodo = () => {
    setTodos(todos.map(todo => (
      (todo.id !== id)
        ? todo
        : {
          ...todo,
          completed: !todo.completed,
        }
    )));
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditingTitle = (handleEvent) => {
    const { value } = handleEvent.target;

    setEditingTitle(value);
  };

  const leaveSameTitle = () => {
    setEditingTitle(title);
    setWasDoubleClicked(false);
  };

  const handleUpdateTitle = () => {
    if (editingTitle !== '') {
      setTodos(todos.map(todo => (
        (todo.id !== id)
          ? todo
          : {
            ...todo,
            title: editingTitle,
          }
      )));

      setWasDoubleClicked(false);
    } else {
      leaveSameTitle();
    }
  };

  const handleOnKeyDown = (handleEvent) => {
    if (handleEvent.key === 'Enter') {
      handleUpdateTitle();
    }

    if (handleEvent.key === 'Escape') {
      leaveSameTitle();
    }
  };

  useMountEffect(setInputFocus, wasDoubleClicked);

  return (
    <li
      className={className(
        completed ? 'completed' : '',
        wasDoubleClicked ? 'editing' : '',
      )}
      onDoubleClick={() => setWasDoubleClicked(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          onChange={handleCompleteTodo}
          checked={completed}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          onClick={handleDeleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editingTitle}
        ref={inputRef}
        onBlur={handleUpdateTitle}
        onChange={handleEditingTitle}
        onKeyDown={handleOnKeyDown}
        required
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
