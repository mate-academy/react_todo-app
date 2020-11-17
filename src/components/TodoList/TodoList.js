import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export function TodoList({
  todos,
  changeStatus,
  deleteTodo,
  forToggleAll,
  updateTodoItem,
}) {
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const completedStatusCheck = todos.every(todo => (
      todo.completed === true
    ));

    if (completedStatusCheck) {
      setAllCompleted(true);
    }
  }, [todos]);

  const toggleAll = () => {
    if (allCompleted) {
      forToggleAll();
      setAllCompleted(false);
    }
  };

  return (
    <>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={allCompleted}
          onChange={toggleAll}
        />
        <label
          htmlFor="toggle-all"
          title="Mark all as completed"
        >
          Mark all as completed
        </label>

        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              changeStatus={changeStatus}
              key={todo.id}
              deleteTodo={deleteTodo}
              updateTodoItem={updateTodoItem}
            />
          ))}

          {/* NEED TO DELETE SOME ELEMENTS UNDER THE COMMENT */}
          {/* <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>asdfghj</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="completed">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>qwertyuio</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li className="editing">
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>zxcvbnm</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li>

          <li>
            <div className="view">
              <input type="checkbox" className="toggle" />
              <label>1234567890</label>
              <button type="button" className="destroy" />
            </div>
            <input type="text" className="edit" />
          </li> */}

          {/* NEED TO DELETE SOME ELEMENTS ABOVE THE COMMENT */}

        </ul>
      </section>
    </>
  );
}

TodoList.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  forToggleAll: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isReuired,
      title: PropTypes.string.isReuired,
      completed: PropTypes.bool.isReuired,
    }).isRequired,
  ).isRequired,
};
