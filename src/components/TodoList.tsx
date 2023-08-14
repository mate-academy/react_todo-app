/* eslint-disable */
import React, { useContext } from "react";
import { StateContext } from '../ToDoContext';
// import { ToDo } from "../types/ToDo";
import { ToDoItem } from './ToDo'
/* eslint-disable */
// eslint-disable

export const ToDoList: React.FC = React.memo(() => {
  const { list } = useContext(StateContext)
  console.log(list)
  return (
    <ul className="todo-list" data-cy="todoList">
      {list.map(toDo => {
        return (
          <ToDoItem toDo={toDo} key={toDo.id} />
        )
      })}
    </ul>
  )
})
