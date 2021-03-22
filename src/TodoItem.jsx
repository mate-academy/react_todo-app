import React, { useContext, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TodoContext } from './TodoContext';

export const TodoItem = ({ todo }) => {
  const { todos, setTodo } = useContext(TodoContext);
  const [isEditable, setIsEditable] = useState(false);
  const [changedValue, setChangedValue] = useState(todo.title);

  const useMountEffect = fun => useEffect(fun, [isEditable]);

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };

  const [inputRef, setInputFocus] = useFocus();

  useMountEffect(setInputFocus);

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
          onChange={() => {
            setTodo(todos.map(todoThis => (todoThis.id === todo.id
              ? {
                ...todoThis,
                completed: !todoThis.completed,
              }
              : todoThis)));
          }}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={() => {
            setTodo(todos.filter(todoThis => todoThis.id !== todo.id));
          }}
        />
      </div>
      <input
        type="text"
        className="edit"
        onChange={event => setChangedValue(event.target.value)}
        value={changedValue}
        ref={inputRef}
        onBlur={() => {
          if (changedValue !== '') {
            setTodo(todos.map(todoThis => (todoThis.id === todo.id
              ? {
                ...todoThis,
                title: changedValue,
              }
              : todoThis)));
            setIsEditable(false);
          } else {
            setTodo(todos.filter(todoThis => todoThis.id !== todo.id));
            setIsEditable(false);
          }

          setIsEditable(false);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            if (changedValue !== '') {
              setTodo(todos.map(todoThis => (todoThis.id === todo.id
                ? {
                  ...todoThis,
                  title: changedValue,
                }
                : todoThis)));
              setIsEditable(false);
            } else {
              setTodo(todos.filter(todoThis => todoThis.id !== todo.id));
              setIsEditable(false);
            }
          }

          if (event.key === 'Escape') {
            setChangedValue(todo.title);
            setIsEditable(false);
          }
        }}
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
