import React from 'react';

import TodoItem from '../TodoItem/TodoItem';
import { TodoListTypes } from '../PropTypes/PropTypes';
/* eslint-disable */
const TodoList = ({
  todos,
  destroyTodo,
  changeStatus,
  changeStatusAll,
  handleEdit,
  handleTodoTitleEdit,
  footerDisplay
}) => (
  <section className="main" style={{ display: footerDisplay }}>
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label
      onClick={changeStatusAll}
      htmlFor="toggle-all"
      style={{ display: 'block' }}
    >
      Mark all as complete
    </label>
    <ul className="todo-list">
      { todos.map(todo => (
        <TodoItem
          changeStatus={changeStatus}
          destroyTodo={destroyTodo}
          title={todo.todoTitle}
          completed={todo.completed}
          key={todo.id}
          id={todo.id}
          todo={todo}
          handleTodoTitleEdit={handleTodoTitleEdit}
        />
      ))}
    </ul>
  </section>
);
/* eslint-enable */

TodoList.propTypes = TodoListTypes;

export default TodoList;
