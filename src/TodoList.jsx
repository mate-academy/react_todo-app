import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({
  todoList,
  handleChecked,
  deleteTodo,
  changeTodoTitle,
}) => (
  <ul className="todo-list">
    {todoList.map(todo => (
      <TodoItem
        key={todo.id}
        id={todo.id}
        completed={todo.completed}
        title={todo.title}
        handleChecked={handleChecked}
        deleteTodo={deleteTodo}
        changeTodoTitle={changeTodoTitle}
      />
    ))}
  </ul>
);
