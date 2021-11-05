import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TodoContext } from './TodoContext';
import { useFocus } from './hooks';

export const TodoItem = ({ todo }) => {
  const { todos, setTodo } = useContext(TodoContext);
  const [isEditable, setIsEditable] = useState(false);
  const [changedValue, setChangedValue] = useState(todo.title);

  const useMountEffect = fun => useEffect(fun, [isEditable]);

  const [inputRef, setInputFocus] = useFocus();

  useMountEffect(setInputFocus);

  const handleChange = () => {
    setTodo(todos.map((todoCurrent) => {
      if (todoCurrent.id === todo.id) {
        return ({
          ...todoCurrent,
          completed: !todoCurrent.completed,
        });
      }

      return todoCurrent;
    }));
  };

  const deleteTodo = () => {
    setTodo(todos.filter(todoCurrent => todoCurrent.id !== todo.id));
  };

  const updateTodo = () => {
    if (changedValue !== '') {
      setTodo(todos.map((todoCurrent) => {
        if (todoCurrent.id === todo.id) {
          return ({
            ...todoCurrent,
            title: changedValue,
          });
        }

        return todoCurrent;
      }));
      setIsEditable(false);
    } else {
      setTodo(todos.filter(todoCurrent => todoCurrent.id !== todo.id));
      setIsEditable(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      updateTodo();
    }

    if (event.key === 'Escape') {
      setChangedValue(todo.title);
      setIsEditable(false);
    }
  };

  return (
    <li
      key={todo.id}
      className={classNames({
        completed: todo.completed,
        editing: isEditable,
      })}
      onDoubleClick={() => {
        setIsEditable(true);
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={handleChange}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={deleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        onChange={event => setChangedValue(event.target.value)}
        value={changedValue}
        ref={inputRef}
        onBlur={updateTodo}
        onKeyDown={handleKeyPress}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
