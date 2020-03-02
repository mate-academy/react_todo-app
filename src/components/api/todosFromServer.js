/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export const todosFromServer = [
  {
    id: uuidv4(), title: 'task 1', completed: false,
  },
  {
    id: uuidv4(), title: 'task 2', completed: false,
  },
  {
    id: uuidv4(), title: 'task 3', completed: false,
  },
];

const template = (
  <ul className="todo-list">
    <li>
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

    <li>
      <div className="view">
        <input type="checkbox" className="toggle" id="todo-4" />
        <label htmlFor="todo-4">1234567890</label>
        <button type="button" className="destroy" />
      </div>
      <input type="text" className="edit" />
    </li>
  </ul>
);
