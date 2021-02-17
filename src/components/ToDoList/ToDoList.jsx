import React from 'react';
import { TodoItem } from '../TodoItem';

export const ToDoList = ({ toDosToShow }) => {

  return (
    <ul className="todo-list">
      {toDosToShow.map(todo => (
       <TodoItem todo={todo}/>
      ))}
    </ul>
  );
}
