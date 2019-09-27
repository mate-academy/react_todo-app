import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
  todos, destroyTodo, changeStatus, changeStatusAll, handleEdit,
}) => (
  <section className="main" style={{ display: 'block' }}>
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label onClick={changeStatusAll} htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      { todos.map(todo => (
        <TodoItem
          handleEdit={handleEdit}
          changeStatus={changeStatus}
          destroyTodo={destroyTodo}
          title={todo.todoTitle}
          completed={todo.completed}
          key={todo.id}
          id={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  </section>
);

export default TodoList;
