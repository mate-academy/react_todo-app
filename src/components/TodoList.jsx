import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <section className="main" style={{ display: 'block' }}>
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">

        {todos.map(todoItem => (
          <TodoItem todo={todoItem} />
        ))}

      </ul>
    </section>
  );
};

export default TodoList;
