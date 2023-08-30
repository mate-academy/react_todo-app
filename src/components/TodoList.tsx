import React from 'react';
import { ToDo } from '../types/ToDo';
import { ToDoItem } from './ToDo';

type Props = {
  list: ToDo[],
};

export const ToDoList: React.FC<Props> = ({ list }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {list.map(toDo => {
        return (
          <ToDoItem toDo={toDo} key={toDo.id} />
        );
      })}
    </ul>
  );
};
