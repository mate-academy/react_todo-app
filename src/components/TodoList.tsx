/* eslint-disable */
import React from "react";
// import { StateContext } from '../ToDoContext';
import { ToDo } from "../types/ToDo";
import { ToDoItem } from './ToDo'
/* eslint-disable */
// eslint-disable

type Props = {
  list: ToDo[],
}

export const ToDoList: React.FC<Props> = ({ list }) =>{
  console.log(list, 'list component')

  return (
    <ul className="todo-list" data-cy="todoList">
      {list.map(toDo => {
        return (
          <ToDoItem toDo={toDo} key={toDo.id} />
        )
      })}
    </ul>
  )
}
