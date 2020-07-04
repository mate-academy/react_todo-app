import React from 'react';
import { TodoShape } from '../../Shapes';

export const Todo = (props) => {
  const {
    todo: { id, title, completed },
    checkedTodo,
    deleteTodo,
  } = props;

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          name="todo"
          className="toggle"
          checked={completed}
          id={id}
          onChange={event => checkedTodo(event.target.id)}
        />
        <label htmlFor={id}>{title}</label>
        <button
          type="button"
          id={id}
          className="destroy"
          onClick={event => deleteTodo(event.target.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
      />
    </>
  );
};

Todo.propTypes = TodoShape.isRequired;
