import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import './styles/todoList.css';

const TodoList = ({ todos, changeCompleted, changeCompletedAll}) => (
  <section className="main" style={{ display: 'block' }}>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      onChange={() => changeCompletedAll()}
    />
    <label
      htmlFor="toggle-all"
    >
      Mark all as complete
    </label>

    <ul className="todo-list">
      {
        todos.map(todo => {
          const classes = classnames ({
              'todo-active': todo.completed === false,
              'todo-completed': todo.completed === true,
          });

          return (
            <li className={classes} key={todo.id}>
              <div className="view">
                <input
                  type="checkbox"
                  name="completed"
                  className="toggle"
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => changeCompleted(todo.id)}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={classes}
                >
                  { todo.title }
                </label>
                <button type="button" className="destroy"/>
              </div>
            </li>
          )
        })
      }
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: propTypes.arrayOf().isRequired,
  changeCompleted: propTypes.func,
  changeCompletedAll: propTypes.func,
};

export default TodoList;
