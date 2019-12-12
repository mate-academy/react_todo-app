/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropsTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todo, allCompleted, todoState }) => {
  const handleCompleted = () => {
    const newTodo = todo.map(item => ({
      ...item,
      isCompleted: !checkCompleted,
    }));

    allCompleted(newTodo);
  };

  const checkCompleted = todoState.every(item => item.isCompleted);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={checkCompleted}
        onChange={handleCompleted}
      />
      <label
        htmlFor="toggle-all"
        className={`todo__label
          ${todo.length ? 'show--toggle' : ''}`}
      >
        Mark all as complete
      </label>

      <ul className="todo-list">
        {todo.map((item, index) => (
          <TodoItem
            item={item}
            id={index + 1}
            todo={todo}
            changeCompleted={allCompleted}
          />
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  todo: PropsTypes.arrayOf.isRequired,
  allCompleted: PropsTypes.func.isRequired,
  todoState: PropsTypes.arrayOf.isRequired,
};

export default TodoList;
