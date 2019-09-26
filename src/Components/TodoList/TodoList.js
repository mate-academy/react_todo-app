import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, deleteTodo }) => (
  todos.map(item => (
    <TodoListItem
      id={item.id}
      key={item.id}
      labelId={`todo-${item.id}`}
      title={item.title}
      taskCompleted={item.completed}
      deleteTodo={deleteTodo}
    />
  )));

export default TodoList;
