import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, deleteTodo, setCompleted }) => (
  todos.map(item => (
    <TodoListItem
      id={item.id}
      key={item.id}
      labelId={`todo-${item.id}`}
      title={item.title}
      taskCompleted={item.completed}
      deleteTodo={deleteTodo}
      setCompleted={setCompleted}
    />
  )));

export default TodoList;
