import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../types/Todo';
import './TodoList.scss';

type Props = {
  items: Todo[],
  deleteTodo: (todoId: number) => void,
  changeStatus: (todoId: number) => void,
  changeTitle: (todoId: number, newTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  items,
  deleteTodo,
  changeStatus,
  changeTitle,
}) => {
  return (
    <ul className="TodoList">
      {items.map((item: Todo) => (
        <li
          key={item.id}
        >
          <TodoItem
            todo={item}
            deleteTodo={deleteTodo}
            changeStatus={changeStatus}
            changeTitle={changeTitle}
          />
        </li>
      ))}
    </ul>
  );
};
