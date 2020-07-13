import React from 'react';
import { TodoShape } from '../Shape';

export const Todo = ({ todo, check, deleteTodo }) => (
  <>
    <div className="view">
      <input
        type="checkbox"
        className="toggle"
        onChange={check}
        id={todo.id}
        value={todo.id}
        checked={todo.isCompleted}
      />
      <label>{todo.title}</label>
      <button
        type="button"
        className="destroy"
        value={todo.id}
        onClick={deleteTodo}
      />
    </div>
    <input type="text" className="edit" />
  </>
);

Todo.propTypes = TodoShape;
