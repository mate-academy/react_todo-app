import React from 'react';
import { TodoItem } from '../TodoItem';
import { TodoListShape } from '../shapes/TodoListShapes';

export const TodoList = ({
  todoList,
  handleChecked,
}) => (
  <ul className="todo-list">
    {todoList.map(todo => (
      <TodoItem
        key={todo.id + todo.title}
        id={todo.id}
        completed={todo.completed}
        title={todo.title}
        handleChecked={handleChecked}
      />
    ))}
  </ul>
);

TodoList.propTypes = TodoListShape;
