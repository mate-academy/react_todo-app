import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = (props) => {
  const { todos, toggleComplete, deleteItem } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          completed={todo.completed}
          id={todo.id}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      ))}
      {/* <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-1" />
          <label htmlFor="todo-1">asdfghj</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-2" />
          <label htmlFor="todo-2">qwertyuio</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-3" />
          <label htmlFor="todo-3">zxcvbnm</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="todo-4" />
          <label htmlFor="todo-4">1234567890</label>
          <button type="button" className="destroy" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
