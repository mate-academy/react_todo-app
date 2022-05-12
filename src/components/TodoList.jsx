/* eslint-disable no-console */
import React from 'react';
import { TodoItem } from './TodoItem';

const TodoList = ({ todos }) => {
  console.log(todos);

  return (
    <ul className="todo-list">
      {todos.map((item) => {
        const todo = JSON.parse(item);

        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </ul>
  );
};

export default TodoList;
