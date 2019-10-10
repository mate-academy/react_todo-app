import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({
  handleDestroy,
  todos,
  handleCheckBox,
}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        handleDestroy={handleDestroy}
        handleCheckBox={handleCheckBox}
        todo={todo}
        id={todo.id}
      />
    ))}
  </ul>
);

export default TodoList;
