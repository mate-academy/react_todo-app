import React, { useState, useEffect } from 'react';

export const ToDoList = ({
  listOfToDos
}) => {
  const [toDosToShow, setToDosToShow] = useState(listOfToDos);

  useEffect(() => {
    setToDosToShow(listOfToDos);
  }, [listOfToDos]);

  console.log(toDosToShow);

  return (
    <ul className="todo-list">
      {toDosToShow.map(todo => (
        <li key={todo.id}>
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>{todo.title}</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>
      ))}
    </ul>
  );
}
