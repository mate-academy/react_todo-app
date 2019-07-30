import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import './styles/todoList.css';
import Todo from './Todo';

const TodoList = ({ todos, changeCompleted, changeCompletedAll, removeTodo}) => (
  <section className="main">
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
              'todo-active': !todo.completed,
              'todo-completed': todo.completed,
          });

          return (
            <li className={classes} key={todo.id}>
              <Todo
                todo={todo}
                changeCompleted={changeCompleted}
                removeTodo={removeTodo}
              />
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
