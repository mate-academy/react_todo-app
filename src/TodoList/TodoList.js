import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos }) => (
  todos.map(item => (
    <TodoListItem
      key={item.id}
      title={item.title}
      completed={item.completed}
    />
  )));

export default TodoList;
