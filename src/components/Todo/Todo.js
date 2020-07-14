import React from 'react';
import PropTypes from 'prop-types';
import { todoShape } from '../Shapes';

export const Todo = (props) => {
  const { todoList, todo, todoListCopy } = props;

  const deleteTodo = (event) => {
    const findId = event.target.parentElement.firstElementChild.id;
    const todos = todoList
      .filter(currentTodo => currentTodo.id !== +findId);
    const todosCopy = props.todoListCopy
      .filter(currentTodo => currentTodo.id !== +findId);

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

    props.getTodos(todos, todoListCopy);
  };

  return (
    <li
      className={todo.completed ? 'completed' : ''}
      key={todo.id}
    >
      <div className="view">
        <input
          className="toggle"
          id={todo.id}
          type="checkbox"
          onChange={changeStatus}
          checked={todo.completed}
        />
        <label htmlFor={todo.id}>{todo.title}</label>
        <button
          className="destroy"
          type="button"
          onClick={deleteTodo}
        />
      </div>
      <input className="edit" type="text" />
    </li>
  );
};

Todo.propTypes = {
  todo: todoShape.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,
  todoListCopy: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired,
  getTodos: PropTypes.func.isRequired,
};
