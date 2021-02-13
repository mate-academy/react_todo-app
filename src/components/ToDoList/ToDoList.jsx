import React, { useState, useEffect } from 'react';
import { TodoItem } from '../TodoItem';

export const ToDoList = ({
  listOfToDos
}) => {
  const [toDosToShow, setToDosToShow] = useState(listOfToDos);

  useEffect(() => {
    setToDosToShow(listOfToDos);
  }, [listOfToDos]);

  return (
    <ul className="todo-list">
      <TodoItem toDosToShow={toDosToShow}/>
    </ul>
  );
}
