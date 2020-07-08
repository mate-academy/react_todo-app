import React from 'react';
import PropTypes from 'prop-types';
import { todoShape } from './Shapes';

export const Todo = (props) => {
  const deleteItem = (event) => {
    const searchId = event.target.parentElement.firstElementChild.id;
    const todos = props.todoList
      .filter(todo => todo.id !== Number(searchId));
    const todosCopy = props.todoListCopy
      .filter(todo => todo.id !== Number(searchId));

    props.getTodos(todos, todosCopy);
  };

  const changeStatus = (event) => {
    const todoId = event.target.id;

    const todos = props.todoList.map((item) => {
      const currentItem = item;

      if (currentItem.id === +todoId) {
        currentItem.completed = !item.completed;
      }

      return currentItem;
    });

    props.getTodos(todos, props.todoListCopy);
  };

  return (
    <li key={props.todo.id}>
      <div className="view">
        <input
          checked={props.todo.completed}
          type="checkbox"
          className="toggle"
          id={props.todo.id}
          onChange={changeStatus}
        />
        <label htmlFor={props.todo.id}>{props.todo.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={deleteItem}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};

Todo.propTypes = {
  todo: todoShape.isRequired,
  getTodos: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,
  todoListCopy: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,

};
