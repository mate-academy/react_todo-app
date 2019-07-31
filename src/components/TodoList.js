import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleToggle }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleToggle={handleToggle}
      />
    ))}
  </ul>
);

export default TodoList;
