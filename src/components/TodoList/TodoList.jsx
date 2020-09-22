import React from 'react';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, changeProcessTodo }) => {

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          changeProcessTodo={changeProcessTodo}
        />
      ))}
    </ul>
  );
};
