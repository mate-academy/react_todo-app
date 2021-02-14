import React, { useState, useEffect } from 'react';
import { TodoItem } from '../TodoItem';

export const ToDoList = ({
  toDosToShow
}) => {


  return (
    <ul className="todo-list">
      <TodoItem toDosToShow={toDosToShow}/>
    </ul>
  );
}
