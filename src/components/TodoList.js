import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, handleToggle, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleToggle={handleToggle}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

export default TodoList;
