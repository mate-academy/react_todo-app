import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos }) => (
  <section className="main">
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  </section>
);

// <li className="completed">
//   <div className="view">
//     <input type="checkbox" className="toggle" />
//     <label>qwertyuio</label>
//     <button type="button" className="destroy" />
//   </div>
//   <input type="text" className="edit" />
// </li>

