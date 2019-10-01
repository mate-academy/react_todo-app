import React from 'react';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, handleDelete, handleClickCheckBox }) => (
  <ul className="todo-list">
    {todos.length > 0
      && todos.map((todo, index) => (
        <TodoItem
          todo={todo}
          index={index}
          key={todo.id}
          handleDelete={handleDelete}
          handleClickCheckBox={handleClickCheckBox}
        />
      ))}
  </ul>
);

export default TodoList;
