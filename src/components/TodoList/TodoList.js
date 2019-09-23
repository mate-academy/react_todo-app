import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

export const TodoList = ({ todos, checkBoxClick, destroyClick }) => (
  <ul className="todo-list">
    {todos.map((todo, index) => (
      <TodoItem
        todo={todo}
        checkBoxClick={checkBoxClick}
        todos={todos}
        index={index}
        destroyClick={destroyClick}
      />
    ))}
  </ul>
);
