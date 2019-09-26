import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos }) => (
  todos.map(item => (
    <TodoListItem
      key={item.id}
      labelId={`todo-${item.id}`}
      title={item.title}
      taskCompleted={item.completed}
    />
  )));

export default TodoList;
