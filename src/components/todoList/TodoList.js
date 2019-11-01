import React from 'react';
import TodoItem from '../todoItem/TodoItem';

function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.todoList.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={props.deleteitem} isCompleted={props.isCompleted} />
      ))}
    </ul>
  );
}

export default TodoList;
