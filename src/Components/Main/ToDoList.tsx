import React from 'react';
// import { ToDoContext } from '../Context/ToDoContext';
import { ToDoItem } from './ToDoItem';
import { Todo } from '../../Types/Todo';

type Props = {
  items:Todo[]
};

export const ToDoList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {items.map(todo => (
        <ToDoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
