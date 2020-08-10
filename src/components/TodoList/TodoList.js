import React, { useContext } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Context } from '../../context';

function TodoList() {
  const { todos, filter } = useContext(Context);
  let filteredTodos = [];

  if (filter === 'all') {
    filteredTodos = todos;
  }

  if (filter === 'active') {
    filteredTodos = todos.filter(todo => todo.isDone === false);
  }

  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.isDone === true);
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem {...todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;
