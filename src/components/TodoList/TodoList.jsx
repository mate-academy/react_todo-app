import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = props => (
  <section className="main" style={{ display: 'block' }}>
    <input
      value={props.checked}
      onChange={props.onCheckedAll}
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
    />
    <label htmlFor="toggle-all">Markup</label>
    <ul className="todo-list">
      {[...props.todos].map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo.title}
          id={todo.id}
          onDestroy={props.onDestroy}
          onChecked={props.onChecked}
          checked={todo.checked}
        />
      ))}
    </ul>
  </section>
);

export default TodoList;
