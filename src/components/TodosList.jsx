import React from 'react';
import TodoItem from './TodoItem';

const TodosList = ({ todos }) => (
  <>
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  </>
);

export default TodosList;
