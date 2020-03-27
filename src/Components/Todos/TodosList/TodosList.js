/* eslint-disable react/prop-types */
import React from 'react';
import TodoItem from './TodoItem/TodoItem';

const TodosList = ({ todos, isCompleted, deleteTodo, key }) => {
  const todoKey = key;

  return (
    <section className="main">
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        <TodoItem
          key={todoKey}
          todo={todos}
          deleteTodo={deleteTodo}
          markCompleted={isCompleted}
        />
      </ul>

      {/* <ul className="todo-list">

        <li>
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-1" />
            <label htmlFor="todo-1">111</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="completed">
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-2" />
            <label htmlFor="todo-2">222</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-3" />
            <label htmlFor="todo-3">333</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li>
          <div className="view">
            <input type="checkbox" className="toggle" id="todo-4" />
            <label htmlFor="todo-4">444</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>
      </ul> */}
    </section>
  );
};

export default TodosList;
