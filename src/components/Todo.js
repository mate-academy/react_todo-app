import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { todoShape } from './Shapes';

export const Todo = (props) => {
  const [isSelected, setSelected] = useState(false);
  const { todoList, todo, changeTodo } = props;

  const deleteItem = (event) => {
    const searchId = event.target.parentElement.firstElementChild.id;
    const todos = todoList
      .filter(currentTodo => currentTodo.id !== searchId);
    const todosCopy = props.todoList
      .filter(currentTodo => currentTodo.id !== searchId);

    props.getTodos(todos, todosCopy);
  };

  const changeStatus = (event) => {
    const todoId = event.target.id;

    const todos = props.todoList.map((item) => {
      const currentItem = item;

      if (currentItem.id === todoId) {
        currentItem.completed = !item.completed;
      }

      return currentItem;
    });

    props.getTodos(todos, todos);
  };

  const handleKeyDown = (e) => {
    const { value } = e.target;

    if (e.key === 'Enter') {
      if (value === '') {
        const searchId = e.target.id;
        const todos = todoList
          .filter(currentTodo => currentTodo.id !== searchId);
        const todosCopy = props.todoList
          .filter(currentTodo => currentTodo.id !== searchId);

        props.getTodos(todos, todosCopy);
      }

      setSelected(false);
    }
  };

  const handleBlur = (e) => {
    const { value } = e.target;

    if (value === '') {
      const searchId = e.target.id;
      const todos = todoList
        .filter(currentTodo => currentTodo.id !== searchId);
      const todosCopy = props.todoListCopy
        .filter(currentTodo => currentTodo.id !== searchId);

      props.getTodos(todos, todosCopy);
    }

    setSelected(false);
  };

  return (
    <li
      className={todo.completed ? 'completed' : ''}
      key={todo.id}
    >
      <div className="view ">
        <input
          checked={todo.completed}
          type="checkbox"
          className="toggle"
          id={todo.id}
          onChange={changeStatus}
        />
        <label
          onDoubleClick={() => setSelected(true)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={deleteItem}
        />
      </div>
      <input
        ref={input => input && input.focus()}
        type="text"
        id={todo.id}
        className={isSelected ? 'editing' : 'edit'}
        onKeyDown={e => handleKeyDown(e)}
        onBlur={e => handleBlur(e)}
        onChange={e => changeTodo(e, todo.id)}
        value={todo.title}
      />
    </li>
  );
};

Todo.propTypes = {
  todo: todoShape.isRequired,
  changeTodo: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired,
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
  todoListCopy: PropTypes.arrayOf(PropTypes.object).isRequired,
};
