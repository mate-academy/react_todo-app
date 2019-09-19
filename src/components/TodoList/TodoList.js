import React from 'react';
import './TodoList.css';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({
  todos,
  checkBoxClick,
  className,
  handleDelete,
  doubleClick,
}) => (
  <div>
    <ul className="todo-list">
      {todos.map((todo, i) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          todos={todos}
          index={i}
          checkBoxClick={checkBoxClick}
          className={className}
          handleDelete={handleDelete}
          doubleClick={doubleClick}
        />
      ))}
    </ul>
  </div>
);
