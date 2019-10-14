import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
  handleRemove,
  todos,
  handleCheckBox,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        handleRemove={handleRemove}
        handleCheckBox={handleCheckBox}
        todo={todo}
        id={todo.id}
      />
    ))}
  </ul>
);

export default TodoList;
